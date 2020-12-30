import { ApiTags } from '@nestjs/swagger'
import { Bind, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserService } from '../user/user.service'
import { AuthGoogleService } from './auth_google.service'

@ApiTags('auth')
@Controller('auth')
export class AuthGoogleController {
  constructor(private authGoogleService: AuthGoogleService, private userService: UserService ) {
  }
  @Post('/google')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
  }

  @Post('/google/redirect')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  @Bind(Req(), Res())
  async googleLoginRedirect(req, res) {
    const user = req.user.user;
    const token = req.user.token;
    // TODO: access_token decode and set data
    const userInfo = {
      email: user.email,
      lastName: user.name,

      verified: user.email_verified,
      google_id: user.sub,
      google_access_token: token.access_token,
      google_expires_in: token.expires_in,
      logged_in: req.session.user ? true : false
    }
    this.userService.create(userInfo, (created, u) => {
      this.authGoogleService.login(userInfo, (authStatus, user) => {
        res.send({ auth_status: authStatus, user: req.session.user });
      }, req.session);
    })
  }
}