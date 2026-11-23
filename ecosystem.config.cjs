// PM2 process file. Runs the Next.js standalone server on 127.0.0.1 behind Nginx.
module.exports={apps:[{
  name:'hirestaffislamabad',
  script:'server.js',
  cwd:__dirname,
  env:{NODE_ENV:'production',PORT:process.env.PORT||3010,HOSTNAME:'127.0.0.1',DATA_DIR:process.env.DATA_DIR||'/var/www/hirestaffislamabad/data'},
  instances:1,
  max_memory_restart:'400M',
}]};
