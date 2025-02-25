class VacationRequest {
    constructor(id, userId, startDate, endDate, reason, status = 'PENDING', createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.status = status;
        this.createdAt = createdAt;
    }

    static async createRequest(sql, userId, startDate, endDate, reason) {
        const result = await sql`
            INSERT INTO vacation_requests 
                (user_id, start_date, end_date, reason, status)
            VALUES (${userId}, ${startDate}, ${endDate}, ${reason}, 'PENDING')
            RETURNING id, user_id, start_date, end_date, reason, status, created_at
        `;
        return new VacationRequest(...Object.values(result[0]));
    }

    static async getAllRequests(sql) {
        const result = await sql`
            SELECT id, user_id, start_date, end_date, reason, status, created_at
            FROM vacation_requests
            ORDER BY created_at DESC
        `;
    
        return result.map(row => new VacationRequest(
            row.id,
            row.user_id,
            row.start_date,
            row.end_date,
            row.reason,
            row.status,
            row.created_at
        ));
    }

    static async getRequestsByUserId(sql, userId) {
        if (!userId) throw new Error("User ID is required");

        const result = await sql`
            SELECT id, user_id, start_date, end_date, reason, status, created_at
            FROM vacation_requests
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;

        return result.map(row => new VacationRequest(...Object.values(row)));
    }

    static async getRequestById(sql, requestId) {
        const result = await sql`
            SELECT * FROM vacation_requests WHERE id = ${requestId}
        `;
        return result.length ? new VacationRequest(...Object.values(result[0])) : null;
    }

    static async updateStatus(sql, requestId, status, comments = null) {
        const result = await sql`
            UPDATE vacation_requests
            SET status = ${status}
            WHERE id = ${requestId}
            RETURNING id, user_id, start_date, end_date, reason, status, created_at
        `;
        return result.length ? new VacationRequest(...Object.values(result[0])) : null;
    }
}

module.exports = VacationRequest;