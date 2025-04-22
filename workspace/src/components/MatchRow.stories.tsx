import MatchRow from "./MatchRow.tsx";
import { Meta, StoryObj } from "@storybook/react";
import { Match } from "@tanstack/react-router";

type MatchRowMeta = Meta<typeof MatchRow>;

const meta:MatchRowMeta = {
  component: MatchRow
}

export default meta;

type Story = StoryObj<typeof MatchRow>;

export const HomeTeamWonStory: Story = {
  args: {
    match: {
      id: "m1",
      matchDay: "1.",
      homeTeam: "altona", awayTeam: "Düsseldorf",
      homeGoals: 1, awayGoals: 0
    }
  }
}

export const AwayTeamWonStory: Story = {
  args: {
    match: {
      id: "m1",
      matchDay: "1.",
      homeTeam: "altona", awayTeam: "Düsseldorf",
      homeGoals: 2, awayGoals: 4
    }
  }
}
