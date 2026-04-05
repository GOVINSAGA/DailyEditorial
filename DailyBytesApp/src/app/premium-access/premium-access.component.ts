import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-premium-access',
  templateUrl: './premium-access.component.html',
  styleUrls: ['./premium-access.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PremiumAccessComponent implements OnInit {
  userName: string = "";
  isLoggedIn: boolean = false;
  isPremiumUser: boolean = false;

  // Dummy data for premium content
  webinars = [
    { title: 'Tech Leadership Summit 2026', date: 'March 15, 2026', link: '#', description: 'Learn from industry leaders about the future of technology' },
    { title: 'AI and Machine Learning Workshop', date: 'March 22, 2026', link: '#', description: 'Hands-on AI training with expert instructors' },
    { title: 'Digital Marketing Masterclass', date: 'April 5, 2026', link: '#', description: 'Master digital marketing strategies for 2026' }
  ];

  telecasts = [
    { title: 'Live News Analysis', time: 'Daily 8 PM IST', channel: 'DailyBytes Live' },
    { title: 'Expert Talk Series', time: 'Weekdays 6 PM IST', channel: 'DailyBytes Expert' },
    { title: 'Market Watch Live', time: 'Mon-Fri 9 AM IST', channel: 'DailyBytes Finance' }
  ];

  merchandise = [
    { name: 'DailyBytes Premium T-Shirt', status: 'Claim Now' },
    { name: 'Exclusive Coffee Mug', status: 'Claim Now' },
    { name: 'Premium Notebook Set', status: 'Claim Now' },
    { name: 'DailyBytes Cap', status: 'Claim Now' }
  ];

  constructor(private readonly router: Router) {
    let userEmail = sessionStorage.getItem("userName");
    if (userEmail) {
      this.isLoggedIn = true;
      this.userName = userEmail.split("@")[0];
    }
    
    // Check if user has Premium membership
    let membership = sessionStorage.getItem('membership');
    this.isPremiumUser = membership === 'Premium';
  }

  ngOnInit() {
    let userName = sessionStorage.getItem('userName');
    if (!userName) {
      alert('Please login to access this page.');
      this.router.navigate(['/login']);
      return;
    }
    
    // Restrict access to Premium users only
    if (!this.isPremiumUser) {
      alert('This section is only available for Premium members. Please upgrade your membership.');
      this.router.navigate(['/membership']);
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
