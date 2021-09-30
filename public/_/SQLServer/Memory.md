---
layout: article
title: Microsoft SQL Server - Memory usage tricks
description:
date: 2020-03-01
tags: sql
supertag: sql
---

:!: Code examples here have been collected during the years. I don't know where, sorry for not supplying credit.

## Show query plans and their use counts

```SQL
SELECT usecounts, cacheobjtype, objtype, text
FROM sys.dm_exec_cached_plans
CROSS APPLY sys.dm_exec_sql_text(plan_handle)
WHERE usecounts > 1
ORDER BY usecounts DESC;
```

## Show db_buffer_pages per database

```SQL
DECLARE @total_buffer INT;

SELECT @total_buffer = cntr_value
FROM sys.dm_os_performance_counters
WHERE RTRIM([object_name]) LIKE '%Buffer Manager'
AND counter_name = 'Database Pages';

;WITH src AS
(
SELECT
database_id, db_buffer_pages = COUNT_BIG(*)
FROM sys.dm_os_buffer_descriptors
--WHERE database_id BETWEEN 5 AND 32766
GROUP BY database_id
)
SELECT
[db_name] = CASE [database_id] WHEN 32767
THEN 'Resource DB'
ELSE DB_NAME([database_id]) END,
db_buffer_pages,
db_buffer_MB = db_buffer_pages / 128,
db_buffer_percent = CONVERT(DECIMAL(6,3),
db_buffer_pages * 100.0 / @total_buffer)
FROM src
ORDER BY db_buffer_MB DESC;
```

## Show memory mb_used per database

```SQL
SELECT
    databases.name AS database_name,
    COUNT(*) * 8 / 1024 AS mb_used
FROM sys.dm_os_buffer_descriptors
INNER JOIN sys.databases
ON databases.database_id = dm_os_buffer_descriptors.database_id
GROUP BY databases.name
ORDER BY COUNT(*) DESC;
```

## Find out how much memory each table uses

```SQL
use tempdb;
go
SELECT
    objects.name AS object_name,
    objects.type_desc AS object_type_description,
    COUNT(*) AS buffer_cache_pages,
    COUNT(*) * 8 / 1024  AS buffer_cache_used_MB
FROM sys.dm_os_buffer_descriptors
INNER JOIN sys.allocation_units
ON allocation_units.allocation_unit_id = dm_os_buffer_descriptors.allocation_unit_id
INNER JOIN sys.partitions
ON ((allocation_units.container_id = partitions.hobt_id AND type IN (1,3))
OR (allocation_units.container_id = partitions.partition_id AND type IN (2)))
INNER JOIN sys.objects
ON partitions.object_id = objects.object_id
WHERE allocation_units.type IN (1,2,3)
AND objects.is_ms_shipped = 0
AND dm_os_buffer_descriptors.database_id = DB_ID()
GROUP BY objects.name,
         objects.type_desc
ORDER BY COUNT(*) DESC;
```
