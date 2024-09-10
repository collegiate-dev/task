# taskmaster

syncs discord todo channels with notion.

## info

- bun runtime
- deployed on railway

## Editing Notion Table Checklist

How to not shoot yourself in the foot and break things (run integration tests when they're up):

1. Edit table changes on Team Taskmaster table first (easiest to migrate)
2. Once changes are finalized, duplicate Team Taskmaster tables x2 then move them to Taskmaster-Home
3. For new Admin + Finance Taskmaster table, edit the table name, remove Channel property, then migrate all data over
4. Move data from old Taskmaster tables to the new Taskmaster tables you just setup
5. Delete the old Taskmaster tables
6. Move Finance Taskmaster to Finance Work location
7. Update new Taskmaster table ids in this codebase, under `src/schema/models/enums.ts`
8. Update references in Taskmaster Notion documentation page
