const opener = require('opener')
const ConfigStore = require('configstore')
const { Tool } = require('../../../util')
const { toolConstant } = require('../../../constant')
const defaultConfig = require('../defaultConfig')

const config = new ConfigStore(toolConstant.TOOL_CONF, defaultConfig)

exports.open = option => {
    option.open.forEach(str => {
        if (Tool.checkIsLinkLike(str)) {
            // 直接给的是个链接
            opener(Tool.transformToLink(str))
        } else {
            // 检测是否是在config配置过的页面
            const sites = config.get('sites')
            const siteArr = sites.filter(site => site.name === str || site.alias === str)
            if (siteArr.length) {
                const targetSite = siteArr[0]
                if (targetSite.search && option.search) {
                    opener(targetSite.search + option.search)
                } else {
                    opener(targetSite.url)
                }
            } else {
                opener(str)
            }
        }
    })
}
