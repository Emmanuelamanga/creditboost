# WokFlow

## 1. Developer Workflow

### Steps for the Developer

1. **Fetch Updates from `main`**:
   Ensure your local environment is up-to-date with the latest changes from `main`.

   ```bash
   git fetch origin main
   ```

2. **Create a New Feature Branch**:
   Create a new branch for your feature or bug fix from `main`.

   ```bash
   git checkout -b feature/my-feature origin/main
   ```

3. **Make Changes and Commit**:
   After making changes, commit them to your feature branch.

   ```bash
   git add .
   git commit -m "Description of the feature"
   ```

4. **Push Your Feature Branch to Remote**:
   Push your changes to the remote feature branch.

   ```bash
   git push origin feature/my-feature
   ```

5. **Create a Pull Request (PR) to `main`**:
   Once you're done, create a pull request to merge your `feature/my-feature` branch into `main`.
   - Assign reviewers to check your code.
   - Make any required changes based on feedback.

6. **Delete the Feature Branch**:
   After merging, delete the feature branch:

   ```bash
   git branch -d feature/my-feature
   git push origin --delete feature/my-feature
   ```

---

## 2. Reviewer Workflow

### Steps for the Reviewer

1. **Fetch and Checkout the Feature Branch**:
   Review the feature branch by checking it out locally.

   ```bash
   git fetch origin feature/my-feature
   git checkout feature/my-feature
   ```

2. **Review Changes**:
   Review the code using `git diff`, `git log`, and other tools. Run tests to ensure the code works as expected.

3. **Approve or Request Changes**:
   - If everything looks good, approve the pull request.
   - If changes are needed, request them, and the developer will update the feature branch.

4. **Merge the Pull Request into `main`**:
   Once the pull request is approved, **the reviewer** is responsible for merging the feature branch into the `main` branch:
   - Go to the pull request and click "Merge" to merge the feature branch into `main`.
   - After merging, the feature branch can be deleted to keep the repository clean.

---

## 3. Team Lead Workflow

### Steps for the Team Lead

1. **Fetch the Latest Changes from `main`**:
   Ensure your local environment is updated with the latest changes from `main`.

   ```bash
   git fetch origin main
   git checkout main
   ```

2. **Review and Test the Latest Changes**:
   Review the latest changes merged into `main`. Run tests to ensure everything is ready for production.

3. **Merge `main` into `production`**:
   If everything looks good, merge the latest changes into the `production` branch.

   ```bash
   git checkout production
   git merge origin/main
   ```

4. **Push the `production` Branch to Remote**:
   After merging, push the `production` branch to the remote repository.

   ```bash
   git push origin production
   ```

---

### Summary of Pull Requests and Merging

1. **Developer**: Pushes changes to a **feature branch** and opens a **pull request** to merge into `main`.
2. **Reviewer**: Reviews the pull request and **merges** the feature branch into `main`.
3. **Team Lead**: Reviews and merges changes from `main` to `production`.

## Guidelines

- Follow the project’s coding standards.
- Ensure tests are written and passing before submitting a pull request.
- Keep your branches up to date with `main`.
