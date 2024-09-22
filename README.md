# taskmaster

syncs discord todo channels with notion.

## info

- bun runtime
- deployed on railway

## Editing Notion Table Checklist

How to not shoot yourself in the foot and break things (run integration tests when they're up):

1. Duplicate Team Taskmaster table (no content), move table to Taskmaster Home Page, then copy and paste a couple exxample tasks to test on new table
2. Once changes are finalized, duplicate new Team Taskmaster table x2, rename tables to Admin + Finance Taskmaster
3. Port data from old Taskmaster tables to the new Taskmaster tables you just setup, delete old tables
4. Move new Finance Taskmaster to Finance Work Page, new Team Taskmaster to Collegiate Home Page
5. Update new Taskmaster table ids in this codebase, under `src/schema/models/enums.ts`
6. Update references in Taskmaster Notion documentation page, add a new changelog entry
