import { DataTypes } from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';

export interface AccountAttributes {
  id: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'accounts' })
export class Account
  extends Model<AccountAttributes, Partial<AccountAttributes>>
  implements AccountAttributes
{
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  })
  public id: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Balance cannot be negative',
      },
      notNull: {
        msg: 'Balance cannot be null',
      },
      notEmpty: {
        msg: 'Balance cannot be empty',
      },
    },
  })
  public balance: number;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
  })
  public createdAt: Date;

  @Column({
    allowNull: false,
    type: DataTypes.DATE,
  })
  public updatedAt: Date;
}
