module.exports = () => {
    const data = {
        users: []
    }
    // 创建 100 个 users
    for (let i = 0; i < 100; i++) {
        data.users.push({
            id: i, name: `user${i
                }`
        })
    }
    return data
}