# taskmaster

syncs discord todo channels with notion.

## info

- bun runtime
- deployed on railway

## Editing Notion Table Checklist

How to not shoot yourself in the foot and break things (run integration tests when they're up):

1. Edit table changes on Taskmaster-Team table first (easiest to migrate)
2. Once changes are finalized, duplicate tables x2 then move them to Taskmaster-Home
3. For new Admin + Finance table, edit the table name, remove Channel property, then migrate all data over
4. For new Admin table, add type Testing into status property and add Testing view
5. Move data from old Taskmaster tables to the new tables you just setup
6. Delete the old Taskmaster tables
7. Move Finance table to Finance Work
8. Update new Taskmaster table ids in this codebase, under `src/schema/models/enums.ts`
