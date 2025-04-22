# Preparations for React Training

> During the workshop, we will complete exercises. To participate, you need to install some necessary tools (if you haven't already).
>
> You can use this guide to check, if your setup works _before_ the workshop. This ensures you have time to resolve any issues, especially if your computer has security restrictions or you lack full administrative access.
>
## Requirements

**For Your Laptop/PC**

Ensure the following are installed on your laptop/PC:

- **Git** (for cloning the workspace)
- **[Node.js](https://nodejs.org/en/download/)** and **package manager** (see below)
- **A Web Browser**
- **An IDE or a Text Editor.** If you already have a preferred editor, use it during training to avoid learning a new tool. Otherwise, the following tools are recommended:
  - [WebStorm](https://www.jetbrains.com/webstorm/download/) (Evaluation version is sufficient)
  - [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (Ultimate Edition; evaluation version is also sufficient)
  - [Visual Studio Code](https://code.visualstudio.com/)

> **Note on IntelliJ/Webstorm TypeScript support**
> 
> When using IntelliJ or Webstorm, please make sure you're using an up-to-date 
> release of it. Older versions might not work correctly with the recent
> version of TypeScript that we're using during the workshop

## Node.JS + Package Manager

- Please use a **Node.js** LTS version (currently 22.x). For testing, I used version `22.14`, but I think newer versions should also work.
- I'm using [pnpm](https://pnpm.io/) as my **package manager**, because I find it more performant than npm and it has an simpler cli.
- If you do not have pnpm installed, you can either:
    - Install pnpm. The easiest way is to use "corepack" for the installation. Corepack is part of Node.js. More information: https://pnpm.io/installation#using-corepack
    - Do not use pnpm. Probably installing the packages in the workspace will also work with `npm`, that is part of Node.js.


**Optional: Browser Extensions for React**

- For working with React, there a developer tools for your browser. 
  - Find more information here: https://react.dev/learn/react-developer-tools
  - These Developer Tools are **not required** for the workshop.

**During the Training**

- As updates may need to be installed before and during training, **ensure that your computer has internet access throughout the session**:
  - Ensure that installing (p)npm packages and pulling Git repositories also work during the training.
  - Check that no proxy, VPN, firewall, or other settings prevent access to Git and npm.
- **Please keep your camera on during the training!** Otherwise, it’s difficult for me to see if I am boring you or if you’re struggling to keep up.
  - You only need to turn on your microphone when you want to speak or ask a question (which you are welcome to do at any time!).
- **Wi-Fi is convenient, but a wired network connection is more stable for (long) streaming sessions.** If possible, use a cable connection instead of Wi-Fi (and disable Wi-Fi) for a smoother experience 😊.

# Installation and Preparation of the Workspace for Training

To ensure everything runs smoothly during the workshop, **please complete the following steps beforehand**, even if updates are made during the session (which is why Git and pnpm should also work _during_ the workshop).

## Step 1: Clone the Repository and Install Packages

1. Clone the repository:

   ```bash
   git clone https://github.com/nilshartmann/react-workshop-april
   ```

> Note that I will upgrade the repository one more time before the workshop!
> 
> **Please make sure, that `git pull` works on your machine during the workshop**, so that you can get the latest
> updates when the workshop starts

2. Install the required npm packages:

   ```bash
   cd ./backend
   pnpm install

   cd ./workspace
   pnpm install
   pnpm run build
   ```

* You should see the message `built in XXXms` on the console

## Step 2: Verify that the REST Backend Works

1. Start the backend from the **backend** directory:

   ```bash
   cd ./backend
   pnpm start
   ```

   **Note!** The backend runs on **Port 7100**, so this port must be available.

2. Test the backend:

   - Open this URL in a browser (or use `curl`, `wget`, or `httpie`): [http://localhost:7100/cards](http://localhost:7100/cards)
   - You should see JSON data returned.

## Step 3: Verify that the frontend workspace works

- During the workshop we will work inside the directory `react19-training/workspace`. Please execute the following
  steps in that folder.

1. Run the "Hello-World"-Test:
   ```bash
   cd ./workspace
   pnpm run hello-world-test
   ```
   
* You should see output like this:
```
Test Files  1 passed (1)
      Tests  1 passed (1)
```

2. Start the frontend: 

   ```bash
   cd ./workspace
   pnpm dev
   ```

**Note!** The frontend runs on **Port 3000**, so this port must be available.

3. Once the frontend starts, test the application by opening [http://localhost:3000](http://localhost:3000) in your browser. You should see a "Hello World" message.

# **That's it! 😊**

- If you have any questions or run into issues, feel free to reach out to me.

## During the Workshop...

- During the workshop, we will build a simple React application step by step
- At each step, I will first show you a React feature in my editor using some live coding. During this time it's enough when you follow my explanations. You do not have to write code yourself at the same time as I'm coding. 
- Afterward, you will do an exercise (which will always more or less the same that I did just before)
- After each step (and before the exercise), I will commit my code and the task description to this repository.
    - I will do this on a separate branch, so you can commit your code to the `main` branch (if you want to, of course, you don't have to).
    - I will then paste the link to the GitHub commit into the chat so you can view the task description and (my) solution there.
