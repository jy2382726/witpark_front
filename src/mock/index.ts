import Mock from "mockjs";
Mock.setup({
    timeout: "200-600"
})
// 登录接口
Mock.mock('https://www.demo.com/login', "post", (req: any) => {
    // console.log('login request', req)
    const { username, password } = JSON.parse(req.body)
    // console.log('login request', username, password)
    if (username === "admin" && password === "123456") {
        return {
            code: 200,
            msg: '登录成功',
            data: {
                username: "赵铁柱",
                token: "mocktoken123456admin"
            }
        }
    } else if (username === "manager" && password === "123456") {
        return {
            code: 200,
            msg: '登录成功',
            data: {
                username: "张小三",
                token: "mocktoken123456manager"
            }
        }
    } else if (username === "user" && password === "123456") {
        return {
            code: 200,
            msg: '登录成功',
            data: {
                username: "王老五",
                token: "mocktoken123456user"
            }
        }
    } else {
        return {
            code: 401,
            msg: '用户名或密码错误',
            data: null
        }
    }

})

const menuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "DollarOutlined",
        "label": "财务管理",
        "key": "/finance",
        "children": [
            {

                "icon": "ProfileOutlined",
                "label": "合同管理",
                "key": "/finance/contract",

            },
            {
                "icon": "FrownOutlined",
                "label": "合同详情",
                "key": "/finance/surrender",
            },
            {
                "icon": "FileTextOutlined",
                "label": "账单管理",
                "key": "/finance/bill",
            }
        ]
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/profile",
    }
]

const userMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/profile",
    }
]

const managerMenuList = [
    {
        "icon": "DashboardOutlined",
        "label": "工作台",
        "key": "/dashboard",
    },
    {

        "icon": "TeamOutlined",
        "label": "租户管理",
        "key": "/users",
        "children": [
            {
                "icon": "UnorderedListOutlined",
                "label": "租户列表",
                "key": "/users/list",
            },
            {
                "icon": "UserAddOutlined",
                "label": "新增租户",
                "key": "/users/add",
            }
        ]
    },
    {
        "icon": "LaptopOutlined",
        "label": "物业管理",
        "key": "/estate",
        "children": [
            {

                "icon": "InsertRowLeftOutlined",
                "label": "楼宇管理",
                "key": "/estate/tenement",

            },
            {
                "icon": "BankOutlined",
                "label": "房间管理",
                "key": "/estate/room",
            },
            {
                "icon": "TruckOutlined",
                "label": "车辆信息",
                "key": "/estate/car",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "报修管理",
        "key": "/repair"
    },
    {
        "icon": "TransactionOutlined",
        "label": "招商管理",
        "key": "/merchants",
    },
    {
        "icon": "FundProjectionScreenOutlined",
        "label": "运营管理",
        "key": "/operation",
        "children": [
            {

                "icon": "FundViewOutlined",
                "label": "运营总览",
                "key": "/operation/all",

            },
            {
                "icon": "ReadOutlined",
                "label": "文章发布",
                "key": "/operation/article",
            },
            {
                "icon": "CommentOutlined",
                "label": "内容评论",
                "key": "/operation/comments",
            }
        ]
    },
    {
        "icon": "ToolOutlined",
        "label": "设备管理",
        "key": "/equipment",
    },
    {
        "icon": "ThunderboltOutlined",
        "label": "能源消耗",
        "key": "/energy",
    },
    {
        "icon": "SettingOutlined",
        "label": "系统设置",
        "key": "/settings",
    },
    {
        "icon": "UserOutlined",
        "label": "个人中心",
        "key": "/profile",
    }
]

//菜单接口
Mock.mock('https://www.demo.com/menu', "get", (options: any) => {
    const token = sessionStorage.getItem("token");
    if (token === "mocktoken123456admin") {
        return {
            code: 200,
            message: '请求成功',
            data: menuList
        }
    } else if (token === "mocktoken123456user") {
        return {
            code: 200,
            message: '请求成功',
            data: userMenuList
        }
    } else if (token === "mocktoken123456manager") {
        return {
            code: 200,
            message: '请求成功',
            data: managerMenuList
        }
    } else {
        return {
            code: 200,
            message: "需要登录",
            data: []
        }
    }
})

//dashboard里 图表接口
Mock.mock('https://www.demo.com/energyData', "get", () => {
    return {
        code: 200,
        message: "请求成功",
        data: [
            { name: "煤", data: [120, 132, 101, 134, 90, 230, 210] },
            { name: "气", data: [220, 182, 191, 234, 290, 330, 310] },
            { name: "油", data: [150, 232, 201, 154, 190, 330, 410] },
            { name: "电", data: [320, 332, 301, 334, 390, 330, 320] },
            { name: "热", data: [820, 932, 901, 934, 1290, 1330, 1320] }
        ]
    }
})

// 随机生成手机号
Mock.Random.extend({
    phone: function () {
      var phonePrefixs = ['13','14','15','16','17','18','19'] // 自己写前缀哈
      return this.pick(phonePrefixs) + Mock.mock(/\d{9}/) //Number()
    }
  })

// 查询租户列表接口
Mock.mock('https://www.demo.com/users/list', "post", (options: any) => {
    const { page, pageSize } = JSON.parse(options.body);
    console.log("查询租户列表接口", page, pageSize);
    return {
        code: 200,
        message: "请求成功",
        data: Mock.mock({
            [`list|${pageSize}`]: [
                {
                    "id": "@string('number',6)",//随机生成一个六位数字id
                    "name": "@cname",//随机生成一个人名
                    "status|1": ["1", "2", "3"],
                    "phone": '@phone',
                    "business|1": ['制造业', '互联网', '新媒体', '美业', '新能源', '物流', '电商'],
                    "email": "@email",
                    "creditCode": "@string('number',18)",
                    "industryNo": "@string('number',15)",
                    "organizationCode": "@string('upper',9)",
                    "legalPerson": "@cname",
                },
            ],
            total: 78
        })
    }
})

// 删除租户接口
Mock.mock('https://www.demo.com/users/delete', "delete", (options: any) => {
    const { id } = JSON.parse(options.body);
    console.log("删除租户接口", id);
    return {
        code: 200,
        message: "用户数据删除成功",
        data: {}
    }
})

// 批量删除租户接口
Mock.mock('https://www.demo.com/users/deleteBatch', "delete", (options: any) => {
    const { ids } = JSON.parse(options.body);
    console.log("批量删除租户接口", ids);
    return {
        code: 200,
        message: "用户数据批量删除成功",
        data: {}
    }
})

// 添加租户接口
Mock.mock('https://www.demo.com/users/add', "post", (options: any) => {
    const data = JSON.parse(options.body);
    console.log("添加租户接口", data);
    return {
        code: 200,
        message: "用户数据添加成功",
        data: {}
    }
})

// 更新租户接口
Mock.mock('https://www.demo.com/users/update', "post", (options: any) => {
    const data = JSON.parse(options.body);
    console.log("更新租户接口", data);
    return {
        code: 200,
        message: "用户数据更新成功",
        data: {}
    }
})