"use strict";
// import { supabase } from '../config/supabase'
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeService = void 0;
class RealtimeService {
    static getInstance() {
        if (!RealtimeService.instance) {
            RealtimeService.instance = new RealtimeService();
        }
        return RealtimeService.instance;
    }
    subscribeToUserScans(userId, callback) {
        // TODO: Implement with MySQL-compatible solution or remove if not needed
        return null;
    }
    subscribeToCommunityPosts(callback) {
        // TODO: Implement with MySQL-compatible solution or remove if not needed
        return null;
    }
    notifyDashboardUpdate(userId) {
        // TODO: Implement with MySQL-compatible solution or remove if not needed
        return null;
    }
}
exports.RealtimeService = RealtimeService;
