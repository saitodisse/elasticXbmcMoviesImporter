systems({
  elasticDatabase: {
    depends: [],
    image: {docker: 'library/elasticsearch:latest'},
    shell: '/bin/bash',
    command: 'elasticsearch',
    mounts: {
      '#{manifest.dir}' : path('.'),
      '/data/log'       : persistent('#{system.name}/log'),
      '/data/data'      : persistent('#{system.name}/data'),
    },
    ports:{
      portA: '9200:9200/tcp',
      portB: '9300:9300/tcp',
    },
    wait: {retry: 20, timeout: 1000},
    scalable: {default: 1},
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    }
  }
});