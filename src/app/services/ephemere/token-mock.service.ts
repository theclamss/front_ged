import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenMockService {
  private readonly mockTokenKey = 'accessToken'; // Clé pour le stockage local

  constructor() {}

  // Génère un token JWT mocké
  generateMockToken(): string {
    // Ajout d'un token JWT simulé manuellement
    // Format JWT : {header}.{payload}.{signature}
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        sub: 'user123',
        name: 'Mock User',
        email: 'mockuser@example.com',
        roles: ['admin'],
        iat: Date.now() / 1000, // Date d'émission
        exp: Date.now() / 1000 + 3600, // Expiration dans 1 heure
      })
    );
    const signature = btoa('mock-signature'); // Signature factice

    return `${header}.${payload}.${signature}`;
  }

  // Stocke le token simulé dans localStorage
  storeMockToken(): void {
    const token = this.generateMockToken();
    localStorage.setItem(this.mockTokenKey, token);
    console.log('Mock token generated and stored:', token);
  }

  // Supprime le token simulé du localStorage
  clearMockToken(): void {
    localStorage.removeItem(this.mockTokenKey);
  }
}
