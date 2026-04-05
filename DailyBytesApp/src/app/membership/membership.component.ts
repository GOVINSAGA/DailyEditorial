import { Component, OnInit } from '@angular/core';
import { UserService } from '../dailybytes-services/user-service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  selectedPlan: string | null = null;
  message: string = '';
  userId: number | null = null;
  isLoggedIn: boolean = false;
  userName: string | null = null;
  isPremiumUser: boolean = false;
  hasMembership: boolean = false; // NEW PROPERTY
  currentMembership: string | null = null; // NEW PROPERTY

  // Payment fields
  showPaymentSection = false;
  cardNumber: string = '';
  cvv: string = '';
  expiry: string = '';
  paymentMessage: string = '';
  minExpiry: string = '';

  constructor(private readonly userService: UserService, private readonly router: Router) {
    const id = sessionStorage.getItem('userId');
    this.userId = id ? Number(id) : null;
    this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    this.userName = sessionStorage.getItem('userName');
    
    // Check if user has membership
    this.currentMembership = sessionStorage.getItem('membership');
    this.hasMembership = this.currentMembership !== null && this.currentMembership !== '';
    this.isPremiumUser = this.currentMembership === 'Premium';
    
    this.setMinExpiry();
  }

  ngOnInit() {
    // If user already has a membership, show a message with validity
    if (this.hasMembership) {
      this.message = `You have an active ${this.currentMembership} membership valid for 1 month.`;
    }
  }

  setMinExpiry() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    this.minExpiry = `${now.getFullYear()}-${month}`;
  }

  proceedToPay() {
    if (!this.selectedPlan || !this.userId) {
      this.message = 'Please select a plan and ensure you are logged in.';
      return;
    }

    // Frontend check: prevent if user already has membership
    if (this.hasMembership) {
      this.message = `You already have an active ${this.currentMembership} membership valid for 1 month.`;
      return;
    }

    this.userService.selectMembershipType(this.userId, this.selectedPlan)
      .subscribe({
        next: (res) => {
          this.message = res.message || 'Membership selection successful! Proceeding to payment...';
          this.showPaymentSection = true;
        },
        error: () => {
          this.message = 'Error submitting membership selection.';
        }
      });
  }

  canPay(): boolean {
    const cardValid = /^\d{16}$/.test(this.cardNumber);
    const cvvValid = /^\d{3}$/.test(this.cvv);
    const expiryValid = this.expiry && this.expiry >= this.minExpiry;
    return cardValid && cvvValid && !!expiryValid;
  }

  pay() {
    if (!this.canPay()) {
      this.paymentMessage = 'Please enter valid card details.';
      return;
    }
    
    // Simulate payment success
    this.paymentMessage = 'Payment successful! Thank you for your purchase.';
    
    // Update membership in session storage (this makes it permanent for the session)
    sessionStorage.setItem('membership', this.selectedPlan || '');
    this.hasMembership = true;
    this.currentMembership = this.selectedPlan;
    this.isPremiumUser = this.selectedPlan === 'Premium';
    
    // Redirect after a delay
    setTimeout(() => {
      this.router.navigate(['/view-article']);
    }, 2000);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
