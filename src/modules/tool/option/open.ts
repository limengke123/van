const opener = require('opener')
const ConfigStore = require('configstore')
const { Tool } = require('../../../util/index')
const { toolConstant } = require('../../../constant')
const defaultConfig = require('../defaultConfig')

const config = new ConfigStore(toolConstant.TOOL_CONF, defaultConfig)

interface Isite {
    name: string,
    alias: string,
    search: string,
    url: string
}

export = {
    open: (option: any) => {
        option.open.forEach((str: string) => {
            if (Tool.checkIsLinkLike(str)) {
                // 直接给的是个链接
                opener(Tool.transformToLink(str))
            } else {
                // 检测是否是在config配置过的页面
                const sites: Array<Isite> = config.get('sites')
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
}
