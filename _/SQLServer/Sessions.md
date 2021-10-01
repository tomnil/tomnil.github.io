# 2020-03-01 Microsoft SQL Server - Session tricks

:!: Code examples here have been collected during the years, and some I've modified/written myself. For the copied ones, sorry for not supplying credit.

## Show sessions that has been running for a long time

```SQL
SELECT p.loginame, t.*
FROM sys.dm_tran_active_snapshot_database_transactions t
inner join sys.sysprocesses p on t.session_id = p.spid
ORDER BY elapsed_time_seconds DESC;
```

## Show sessions currently executing (doing work)

```SQL
select * from sys.sysprocesses
where cmd != 'AWAITING COMMAND'
and db_name(dbid)!='master'
```

## Show currently executing commands

```SQL
select T.text, R.Status, R.Command, DatabaseName = db_name(R.database_id)
 , R.cpu_time, R.total_elapsed_time, R.percent_complete
from sys.dm_exec_requests R
 cross apply sys.dm_exec_sql_text(R.sql_handle) T
```

## Build script for killing all sessions for a specific user

```SQL
select 'kill ' + convert(varchar(10), spid) + ' -- kill user ' + loginame from sysprocesses
where loginame like '%confluence%'
```

This will build something like:

```SQL
kill 51 -- kill user confluence.dbuser
kill 52 -- kill user confluence.dbuser
kill 53 -- kill user confluence.dbuser
kill 54 -- kill user confluence.dbuser
```
