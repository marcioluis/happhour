import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

export class FacebookMock extends Facebook {

    login(permissions: string[]) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let aux: FacebookLoginResponse = {
                    status: 'connected',
                    authResponse: { accessToken: '', expiresIn: 1550, secret: '', session_key: true, sig: '', userID: '' }
                };
                resolve(aux);
            }, 2550);
        });
    }

    getAccessToken() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('mock token');
            }, 50);
        });
    }

    api(path, permissions) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(JSON.parse('{"name": "Marcio Luis Soster Arrosi", "gender": "male", "first_name": "Marcio Luis", "last_name": "Soster Arrosi","email": "marciososter@gmail.com","picture": {"data": {"is_silhouette": false,"url": "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16864853_1350653274992440_2770913989161835426_n.jpg?oh=dd988beaa2d9f7e6e17230ef08842d79&oe=599A3429"}},"id": "1016525921738512"}')), 3550);
        });
    }

}