
import { supabase } from '../config/supabase'

export class RealtimeService {
  private static instance: RealtimeService
  
  static getInstance() {
    if (!RealtimeService.instance) {
      RealtimeService.instance = new RealtimeService()
    }
    return RealtimeService.instance
  }
  
  subscribeToUserScans(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`user_scans_${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'crop_scans',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe()
  }
  
  subscribeToCommunityPosts(callback: (payload: any) => void) {
    return supabase
      .channel('community_posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_posts'
        },
        callback
      )
      .subscribe()
  }
  
  notifyDashboardUpdate(userId: string) {
    return supabase
      .channel(`dashboard_${userId}`)
      .send({
        type: 'broadcast',
        event: 'dashboard_update',
        payload: { timestamp: new Date().toISOString() }
      })
  }
}
