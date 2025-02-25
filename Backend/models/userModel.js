class User{
    constructor(username, passwordHash, role){
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    static async createUser(sql, username, passwordHash, role) {
        const result = await sql`
            INSERT INTO users (username, password_hash, role)
            VALUES (${username}, ${passwordHash}, ${role})
            RETURNING id, username, role
        `;
        return new User(result[0].username, result[0].password_hash, result[0].role);
    }

    static async findByUsername(sql, username) {
        const result = await sql`
            SELECT * FROM users WHERE username = ${username}
        `;
        return result[0];
    }

}

module.exports = User;