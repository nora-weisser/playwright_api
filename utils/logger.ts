export class APILogger {

    formatLogs(logs: any[]) {
        const logsResult = logs.map(log => {
            return `===== ${log.type} ======\n${JSON.stringify(log.data, null, 4)}`
        }).join('\n\n');
        return logsResult;
    }

    logRequest(method: string, url: string, headers?: Record<string, string>, body?: any) {
        const logs: any[] = [];
        const logEntry = {method, url, headers, body};
        logs.push({type: 'Request Details', data: logEntry})
        console.log(this.formatLogs(logs));
    }

    logResponse(statusCode: number, body?: any) {
        const logs: any[] = [];
        const logEntry = {statusCode, body};
        logs.push({type: 'Response Details', data: logEntry})
        console.log(this.formatLogs(logs));
    }

}