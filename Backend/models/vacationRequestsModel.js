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
        return new VacationRequest(
            result[0].id,
            result[0].user_id,
            result[0].start_date,
            result[0].end_date,
            result[0].reason,
            result[0].status,
            result[0].created_at
        );
    }

    static async getAllRequests(sql, userId = null) {
        const result = await sql`
            SELECT vr.*, u.username 
            FROM vacation_requests vr
            JOIN users u ON vr.user_id = u.id
            ${userId ? sql`WHERE vr.user_id = ${userId}` : sql``}
            ORDER BY vr.created_at DESC
        `;
        return result.map(
            row =>
                new VacationRequest(row.id, row.user_id, row.start_date, row.end_date, row.reason, row.status, row.created_at)
        );
    }

    static async getRequestById(sql, requestId) {
        const result = await sql`
            SELECT * FROM vacation_requests WHERE id = ${requestId}
        `;
        return result[0] ? new VacationRequest(result[0].id, result[0].user_id, result[0].start_date, result[0].end_date, result[0].reason, result[0].status, result[0].created_at) : null;
    }

    static async updateStatus(sql, requestId, status, comments = null) {
        const result = await sql`
            UPDATE vacation_requests
            SET status = ${status}
            WHERE id = ${requestId}
            RETURNING id, user_id, start_date, end_date, reason, status, created_at
        `;
        return result[0] ? new VacationRequest(result[0].id, result[0].user_id, result[0].start_date, result[0].end_date, result[0].reason, result[0].status, result[0].created_at) : null;
    }
}

module.exports = VacationRequest;
