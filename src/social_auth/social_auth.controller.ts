import { ApiTags } from '@nestjs/swagger'
import { BadRequestException, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common'
import { CreateSocialAuthDto } from './dto/create-social-auth.dto'
import jws from "jws-jwk"

@ApiTags('social')
@Controller('auth')
export class SocialAuthController {
  // constructor(
  //   // private  socialAuthService: SocialAuthService,
  // ) {
  // }

  // @UseGuards(AuthGuard('google'))
  @Post('/google')
  // @Get('/auth/google')
  async googleAuth(@Query(new ValidationPipe()) createSocialAuthDto: CreateSocialAuthDto) {
    console.log('!!!googleAuth', createSocialAuthDto)
    // throw new BadRequestException('googleAuth')
    return await createSocialAuthDto
  }

  // @UseGuards(AuthGuard('google'))
  // @Get('/auth/google/callback')
  // async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) req: CreateSocialAuthDto) {
  //   console.log('!!!getTokenAfterGoogleSignIn', req.uId)
  //   return req.uId
  // }

  // @UseGuards(AuthGuard('google'))
  @Post('/google/callback')
  // @Get('/auth/google/callback')
  async getTokenAfterGoogleSignIn(@Query(new ValidationPipe()) createSocialAuthDto: CreateSocialAuthDto) {
    console.log('!!!getTokenAfterGoogleSignIn', createSocialAuthDto)

    const jwk = {
      "keys": [
        {
          "e": "AQAB",
          "use": "sig",
          "alg": "RS256",
          "kty": "RSA",
          "n": "0zNdxOgV5VIpoeAfj8TMEGRBFg-gaZWz94ePR1yxTKzScHakH4F4wcMEyL0vNE-yW_u4pOl9E-hAalPa2tFv4fCVNMMkmKwcf0gm9wNFWXGakVQ8wER4iUg33MyUGOWj2RGX1zlZxCdFoZRtshLx8xcpL3F5Hlh6m8MqIAowWtusTf5TtYMXFlPaWLQgRXvoOlLZ-muzEuutsZRu-agdOptnUiAZ74e8BgaKN8KNEZ2SqP6vE4w16mgGHQjEPUKz9exxcsnbLru6hZdTDvXbX9IduabyvHy8vQRZsqlE9lTiOOOC9jwh27TXsD05HAXmNYiR6voekzEvfS88vnot2Q==",
          "kid": "eea1b1f42807a8cc136a03a3c16d29db8296daf0"
        }
      ]
    };
    const signedData = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzE5NTExODM3MzcwLTZoMTE5MTltamE5M3U4cmlqbmxidTNoNWo4a3Q5azVsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzE5NTExODM3MzcwLTZoMTE5MTltamE5M3U4cmlqbmxidTNoNWo4a3Q5azVsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDIyMDc0MjI0NTc0NjIxMTg0IiwiZW1haWwiOiJtaW50ZWdyYXRpb24uYW5kcmV5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSUxpUXNTcUhvNzFnaF9LYy0xQ2JPdyIsIm5hbWUiOiJtaW50ZWdyYXRpb24uYW5kcmV5IG1pbnRlZ3JhdGlvbi5hbmRyZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy03dEptcjBmWmtxRS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BTVp1dWNubnFCeXhEWGozaTJwNU5STWZ4cGYycWhxNDdBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJtaW50ZWdyYXRpb24uYW5kcmV5IiwiZmFtaWx5X25hbWUiOiJtaW50ZWdyYXRpb24uYW5kcmV5IiwibG9jYWxlIjoicnUiLCJpYXQiOjE2MTEyMzIxMzgsImV4cCI6MTYxMTIzNTczOCwianRpIjoiMTY3ZjZhODQ5ZmE3NzBhZGZiMzJjNTA4ZGUwN2IwYzU4MTI5MGIyZSJ9.tQQ1MPPv7nxAUXz_8-cgIZ4iXXjGqEY6YC-v4eD8YNzuQGEDlZCCSD0SNYggEjO4kmaewdGYxxAnZ0BZHe_K-zVLVDmAGEE-TbeX20KtyTKZlvSdxcTYTNb0Up2emFZqDITDIF0XR1LbRgg0bHy1keCEnSDf2es0NuQ5Kfqpn8biUik4Lxcg8GhrILyMLOkLXQMoWWR-V1gXdunAOlY56ujuXBz67hq-2UBa61zKTGZMODAsWj7yIX9bUodA-lWKNKLT2LD60gg6XfQGQpTOkpLvWuv2ztf2WrNh7YW7CIzaF0jagrbmxd_BbeN2iBJXc8HNKEOGXIOfSbdDvjZVtQ";

    console.log("verify", jws.verify(signedData, jwk))
    // throw new BadRequestException('getTokenAfterGoogleSignIn')
    return await createSocialAuthDto
  }
}