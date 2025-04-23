const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");

const __matchdays = require("./matchdays.json");
const __events = require("./events.json");

const __all_leagues = (() => {
  const result = new Map();
  __matchdays.forEach((m) => {
    const l = { id: m.leagueId, name: m.leagueName };
    result.set(l.id, l);
  });
  const allLeagueIds = sortLeagues(
    Array.from(result.values()).map((l) => l.id),
  );

  return allLeagueIds.map((lId) => result.get(lId));
})();

const __all_league_ids_as_string = (() => {
  const ids = new Set();
  __matchdays.forEach((m) => ids.add(m.leagueId));
  return [...ids].join(",");
})();

function sortLeagues(userLeagues) {
  // This leagues should be sorted in a fixed way
  //   If we would later add new leagues they will be sorted
  //   after the "priority" leagues
  const priority = ["bl1", "bl2", "bl3", "dfb", "ucl24", "uel24"];

  return userLeagues.slice().sort((a, b) => {
    const indexA = priority.indexOf(a);
    const indexB = priority.indexOf(b);

    const isAInPriority = indexA !== -1;
    const isBInPriority = indexB !== -1;

    if (isAInPriority && isBInPriority) {
      return indexA - indexB;
    } else if (isAInPriority) {
      return -1; // A comes before B
    } else if (isBInPriority) {
      return 1; // B comes before A
    } else {
      return a.localeCompare(b); // fallback alphabetical sort
    }
  });
}

const paramAsNumber = (req, name, defaultValue) => {
  const value = req.query[name];
  if (value === undefined) {
    return defaultValue;
  }

  try {
    return parseInt(value) || defaultValue;
  } catch (err) {
    console.error(`Could not parse value '${value}' to number: ${err}`);
    return defaultValue;
  }
};

function paginateArray(dataName, array, page = 1, size = 10) {
  const totalItems = array.length;
  const totalPages = Math.ceil(totalItems / size);

  const start = (page - 1) * size;
  const end = start + size;
  const data = array.slice(start, end);

  return {
    pageInfo: {
      page,
      size,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalPages,
    },
    [dataName]: data,
  };
}

function toUserResponse(user) {
  return {
    ...user,
    leagueIds: sortLeagues(user.leagueIds),
  };
}

const app = express();

const slowEnabled = process.env.USE_SLOW === "true";

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,PUT,POST,PATCH,DELETE",
  );
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req, _res, next) => {
  if (req.query.slowdown !== undefined || slowEnabled) {
    const timeout = parseInt(req.query.slowdown) || 1200;
    console.log(`Slow down ${timeout}ms`);
    setTimeout(next, timeout);
  } else {
    next();
  }
});

app.get("/api/leagues", (req, res) => {
  res.status(200).json(__all_leagues);
});

app.get("/api/leagues/:leagueId/matchdays", (req, res) => {
  const leagueId = req.params.leagueId;

  if (!__all_leagues.find((l) => l.id === leagueId)) {
    return res.status(404).json({
      error: `No league with id '${leagueId}'`,
    });
  }

  const filteredMatchdays = __matchdays
    .filter((m) => leagueId === m.leagueId)
    .map((matchDay) => ({
      id: matchDay.id,
      title: matchDay.title,
      dateTime: matchDay.dateTime || "unbekannt",
      league: {
        id: matchDay.leagueId,
        name: matchDay.leagueName,
      },
      matches: matchDay.matches.map((m) => ({
        ...m,
        matchDay: matchDay.title,
      })),
    }));
  filteredMatchdays.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
  const page = paramAsNumber(req, "page", 1);
  const size = paramAsNumber(req, "size", 10);

  res
    .status(200)
    .json(paginateArray("matchdays", filteredMatchdays, page, size));
});

function getAllMatchesForLeagues(leagueIds) {
  const filteredMatches = __matchdays
    .filter((m) => leagueIds.includes(m.leagueId))
    .map((m) => ({
      ...m,
      matchesWithLeague: m.matches.map((match) => ({
        ...match,
        league: { id: m.leagueId, name: m.leagueName },
        title: m.title,
      })),
    }))
    .flatMap((m) => m.matchesWithLeague);
  filteredMatches.sort((a, b) =>
    b.matchDateTime.localeCompare(a.matchDateTime),
  );

  return filteredMatches;
}
//
//app.get("/api/matches", (req, res) => {
//  const leagueIds = (req.query.leagues || __all_league_ids_as_string).split(
//    ",",
//  );
//  const filteredMatches = getAllMatchesForLeagues(leagueIds);
//
//  const page = paramAsNumber(req, "page", 1);
//  const size = paramAsNumber(req, "size", 10);
//
//  res.status(200).json(paginateArray("matches", filteredMatches, page, size));
//});

function getMatchesByLeague(leagueIds, limitPerLeague) {
  const filteredMatches = getAllMatchesForLeagues(leagueIds);
  const matchesByLeagues = new Map();
  filteredMatches.forEach((match) => {
    const leagueId = match.league.id;
    const matchesForLeague = matchesByLeagues.get(leagueId);
    const myMatch = {
      matchDay: match.title,
      ...match,
      title: undefined,
    };
    if (!matchesForLeague) {
      matchesByLeagues.set(leagueId, [myMatch]);
    } else {
      if (limitPerLeague < 0 || matchesForLeague.length < limitPerLeague) {
        matchesByLeagues.set(leagueId, [...matchesForLeague, myMatch]);
      }
    }
  });

  const result = leagueIds.map((lId) => {
    const matchesForLeague = matchesByLeagues.get(lId);
    return {
      league: matchesForLeague[0].league,
      matches: matchesForLeague.map((l) => ({ ...l, league: undefined })),
    };
  });

  return result;
}

app.get("/api/matchdays/recent", (req, res) => {
  const leagueIdsString = req.query.leagues;
  if (!leagueIdsString) {
    return res.status(200).json([]);
  }
  const leagueIds = leagueIdsString.split(",");
  const unknownLeagueIds = leagueIds.filter(
    (lId) => !__all_leagues.find((l) => l.id === lId),
  );
  if (unknownLeagueIds.length > 0) {
    return res.status(404).json({
      errors: unknownLeagueIds.map((i) => ({
        error: `Unknown league id '${i}'`,
      })),
    });
  }

  const allMatchesByLeagues = getMatchesByLeague(leagueIds, -1);
  allMatchesByLeagues.forEach((matchesByLeague) => {
    const allMatchesForLeague = matchesByLeague.matches;
    const recentMatchDayName = allMatchesForLeague[0].matchDay;
    const matchesForRecentMatchDay = allMatchesForLeague.filter(
      (md) => md.matchDay === recentMatchDayName,
    );
    matchesByLeague.matches = matchesForRecentMatchDay;
  });
  return res.status(200).json(allMatchesByLeagues);
});

app.get("/api/events", (req, res) => {
  const eventIx = Math.floor(Math.random() * __events.length);
  return res.status(200).json(__events[eventIx]);
});

const __users = {
  1: {
    id: "1",
    name: "Lara Carlson",
    matchesPerLeague: 2,
    leagueIds: ["bl1", "bl3"],
  },
  2: {
    id: "2",
    name: "Monika Sommer",
    matchesPerLeague: 4,
    leagueIds: ["bl2", "dfb", "uel24"],
  },
};

app.get("/api/users/:userId", (req, res) => {
  const user = __users[req.params.userId];
  if (!user) {
    return res.status(400).json({ error: "No such user!" });
  }

  return res.status(200).json(toUserResponse(user));
});

app.get("/api/users/:userId/my-matchdays", (req, res) => {
  const user = __users[req.params.userId];
  if (!user) {
    return res
      .status(400)
      .json({ error: `No such user '${req.params.userId}'` });
  }

  let result = getMatchesByLeague(
    sortLeagues(user.leagueIds),
    user.matchesPerLeague,
  );

  if (req.query.fail !== undefined) {
    // simulate invalid response
    const failingResult = [...result];
    result[0].league = {
      id: "1",
      name: null,
    };
    return res.status(200).json(failingResult);
  }


  return res.status(200).json(result);
});

function validateUserPayload(user) {
  let errors = [];
  if (!user) {
    errors.push({ error: "Payload must be defined" });
    return { errors };
  }

  if (!user.name) {
    errors.push("'name' must be defined and not empty");
  } else if (user.name.length < 5) {
    errors.push({ error: "'name' must have at least five chars" });
  }

  const matchesPerLeague = user.matchesPerLeague;
  if (typeof matchesPerLeague !== "number") {
    errors.push({
      error: `'matchesPerLeague' must be set and must be a number. Actual: '${matchesPerLeague}' (Type: ${typeof matchesPerLeague})`,
    });
  }

  if (matchesPerLeague < 1) {
    errors.push({
      error: `'matchesPerLeague' must be a number value higher then 0`,
    });
  }

  const leagueIds = user.leagueIds;
  if (!Array.isArray(leagueIds)) {
    errors.push({
      error: `'leagueIds' must be an array with strings. Invalid value: '${leagueIds}'`,
    });
  }

  if (errors.length) {
    return { errors };
  }

  return {
    userPayload: {
      name: user.name,
      matchesPerLeague,
      leagueIds,
    },
  };
}

app.post("/api/users", (req, res) => {
  const { userPayload, errors } = validateUserPayload(req.body);
  if (errors?.length) {
    return res.status(400).json(errors);
  }

  // 🙀 😈
  const newUserId = String(Object.keys(__users).length + 1);

  const newUser = {
    id: newUserId,
    ...userPayload,
  };

  __users[newUserId] = newUser;

  return res.status(201).json(toUserResponse(newUser));
});

app.put("/api/users/:userId", (req, res) => {
  const userId = req.params.userId;
  const currentUser = __users[userId];
  if (!currentUser) {
    return res.status(404).json({ errors: `No User with id '${userId}'` });
  }

  const { userPayload, errors } = validateUserPayload(req.body);
  if (errors?.length) {
    return res.status(400).json(errors);
  }

  const updatedUser = {
    ...currentUser,
    ...userPayload,
  };

  __users[userId] = updatedUser;

  return res.status(200).json(toUserResponse(updatedUser));
});

app.patch("/api/users/:userId/leagues/:leagueId", (req, res) => {
  const userId = req.params.userId;
  const currentUser = __users[userId];
  if (!currentUser) {
    return res.status(404).json({ errors: `No User with id '${userId}'` });
  }

  const leagueId = req.params.leagueId;

  if (!__all_league_ids_as_string.split(",").includes(leagueId)) {
    return res.status(404).json({
      errors: `Unknown league id '${leagueId}'`,
      __all_league_ids: __all_league_ids_as_string,
    });
  }

  const exitingsLeagues = currentUser.leagueIds || [];
  let newLeagues = exitingsLeagues.filter((lId) => lId !== leagueId);
  if (newLeagues.length === exitingsLeagues.length) {
    newLeagues = [...exitingsLeagues, leagueId];
  }

  currentUser.leagueIds = newLeagues;

  return res.status(200).json(toUserResponse(currentUser));
});

const port = process.env.SERVER_PORT || 7100;

app.listen(port, () => {
  console.log(`
    📞    API Server listening on port ${port}
    
    ⚽️    Return all available leagues:
    👉    Try GET http://localhost:${port}/api/leagues
    
    ⚽️    Return all match days of a specific leagues (grouped by match days):
    👉    Try GET http://localhost:${port}/api/leagues/bl1/matchdays
    👉    Try GET http://localhost:${port}/api/leagues/bl1/matchdays?page=2
    👉    Try GET http://localhost:${port}/api/leagues/bl1/matchdays?page=2&size=4
    
    ⚽️    Return recent matchday of all (or specified) leagues
    👉    Try GET http://localhost:${port}/api/matchdays/recent
    👉    Try GET http://localhost:${port}/api/matchdays/recent?leagues=bl1,bl2
    
    ⚽    Returns a random "event" on each request, can be used to simulate live ticker    
    👉    Try GET http://localhost:${port}/api/events
    
    🙍    Returns the user with ID 1
    👉    Try GET http://localhost:${port}/api/users/1

    🙍    Returns the matches for "My Matches" UI for user with ID 1
    👉    Try GET http://localhost:${port}/api/users/1/my-matchdays

    🙍    Creates (POST) or updates (PUT) a user. Send as json payload:
              - name (string, max 5 chars)
              - matchesPerLeague (number)
              - leagueIds: (string array)
            Content-Type must be "application/json"  
    👉    Try POST http://localhost:${port}/api/users
    👉    Try PUT http://localhost:${port}/api/users/1
    👉    Try PATCH http://localhost:${port}/api/users/1/leagues/bl1
           (Toggles the specified leagueId 'bl1' for the given user '1')
           
    💤    For artifically delaying the response, add the search param 'slowdown' to your request:
    👉      either "?slowdown=TIME_IN_MILLISECONDS", for a fixed delay in MS
    👉      or only "?slowdown" to add a random delay
    👉      GET http://localhost:${port}/api/users/1?slowdown
    👉      GET http://localhost:${port}/api/users/1?slowdown=3000
`);
});
