
class Config {
}

Config.schema = {
  name: 'Config',
  primaryKey: 'key',
  properties: {
    key:                      'string',                                                   // 配置名
    value:                    'string',                                                   // 配置值
  },
}

export default Config;
