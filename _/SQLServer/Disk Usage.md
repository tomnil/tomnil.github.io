---
layout: article
title: Microsoft SQL Server - Disk usage tricks
description:
date: 2020-03-01
tags: sql
supertag: sql
---

:!: Code examples here have been collected during the years. I don't know where, sorry for not supplying credit.

## Show total disk usage

```SQL
SELECT SUM(size)*1.0/128 AS [size in MB]
FROM tempdb.sys.database_files
```

## View the current database disk usage (detailed)

This query returns the filename, it's current size and the free space.

```SQL
SELECT DB_NAME() AS DbName,
name AS FileName,
size/128.0 AS CurrentSizeMB,
size/128.0 - CAST(FILEPROPERTY(name, 'SpaceUsed') AS INT)/128.0 AS FreeSpaceMB
FROM sys.database_files;
```

## Alternate view

```SQL
SELECT file_name(file_id) as file_name, SUM(unallocated_extent_page_count) AS [free pages],
(SUM(unallocated_extent_page_count)*1.0/128) AS [free space in MB]
FROM sys.dm_db_file_space_usage
group by file_name(file_id)
```

## Show all databases, and their sizes

```SQL
with fs
as
(
    select database_id, type, size * 8.0 / 1024 size
    from sys.master_files
)
select
    name,
    (select sum(size) from fs where type = 0 and fs.database_id = db.database_id) DataFileSizeMB,
    (select sum(size) from fs where type = 1 and fs.database_id = db.database_id) LogFileSizeMB
from sys.databases db
order by name
```
