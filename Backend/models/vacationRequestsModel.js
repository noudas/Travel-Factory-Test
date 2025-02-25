// src/models/vacationRequestModel.js
class VacationRequest {
    constructor(userId, startDate, endDate, reason, status = 'PENDING') {
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.status = status;
    }

    static async createRequest(sql, userId, startDate, endDate, reason) {
        const result = await sql`
            INSERT INTO vacation_requests 
                (user_id, start_date, end_date, reason, status)
            VALUES (${userId}, ${startDate}, ${endDate}, ${reason}, 'PENDING')
            RETURNING id, user_id, start_date, end_date, reason, status, created_at
        `;
        return new VacationRequest(
            result[0].user_id,
            result[0].start_date,
            result[0].end_date,
            result[0].reason,
            result[0].status
        );
    }

    static async getAllRequests(sql, userId = null) {
        const query = sql`
            SELECT vr.*, u.username 
            FROM vacation_requests vr
            JOIN users u ON vr.user_id = u.id
            ${userId ? sql`WHERE vr.user_id = ${userId}` : sql`WHERE TRUE`}
            ORDER BY vr.created_at DESC
        `;
        return await query;
    }
}

module.exports = VacationRequest;