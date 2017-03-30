import { GooglePlus } from '@ionic-native/google-plus';


export class GooglePlusMock extends GooglePlus {

    login(options?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //reject("12501");
                resolve(JSON.parse('{"email":"mock@gmail.com","idToken":"mockI1NiIsImtpZCI6IjkwYTk5NjBkYTI0N2QzZWI4ODRjMWQwMGEzYTAwMzBhMTI4MmQ2NTcifQ.eyJhenAiOiI3ODQyMjA2NzAwNDItOGJ2aHBsaTdvNmF1cWlwdjAyZDM2Ymdpam9wcDhnbWUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODQyMjA2NzAwNDItaWIxc3N2MXV0ZnIxYzRjdmZzNjd0N245dGdrY2sydmsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc3NjkxNDk1NDgyMTgwMzY5MzMiLCJlbWFpbCI6Im1hcmNpb3Nvc3RlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDkwODA2Njk5LCJleHAiOjE0OTA4MTAyOTksIm5hbWUiOiJNYXJjaW8gU29zdGVyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tMXdrY3JLQktwbDQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQ3MvVjJoX0p1RGFLa3Mvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6Ik1hcmNpbyIsImZhbWlseV9uYW1lIjoiU29zdGVyIiwibG9jYWxlIjoicHQifQ.OSp90Qr5sR1X61gmock5HmHEoJhdQy_Ui65oggyUBwAqPCJBLO7ody7DuKaV2F6HbJsLxLkFyEFmp10zrMJmit7KB87hEcVZ3xik-c7pQ0vY3_ndY0_5eiYscmPRvICyQ4Gu8caSyKhj93RBMJrurwadaXWsDtHU9v6yy4X8OIrmNQ3MGftxsrkmq88kEQSrv27SOwkhFqkquFXZVVhGgkEhV0iRq72frYs6tJukG0A2iIA82L6aIfNk95FGRyo82Vvip3D0DDk9opz5SKb-g011UqAl0GiiQCUysNhBBhPLGEcOnxqmocklsXv1hwg","serverAuthCode":"4/mockPOhDQZ_PQbBDTH9rKnzbzao1HHCByoumQ","userId":"107769149548218036933","displayName":"Marcio Mockster","familyName":"Mockster","givenName":"Marcio","imageUrl":"https://lh3.googleusercontent.com/-1wkcrKBKpl4/AAAAAAAAAAI/AAAAAAAAACs/V2h_JuDaKks/s96-c/photo.jpg"}'));
            }, 3550);
        });
    }
}