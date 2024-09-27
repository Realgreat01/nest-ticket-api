import * as bcrypt from 'bcrypt';

export class BcryptConfig {
  private static saltOrRounds = 10;

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(this.saltOrRounds));
  }

  static comparePassword(userPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(userPassword, hashedPassword);
  }
}
