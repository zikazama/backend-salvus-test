// src/models/index.ts
import { DataTypes } from 'sequelize';
import sequelize from '../configs/database';

const Admin = sequelize.define('Admin', {
  admin_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const Kasir = sequelize.define('Kasir', {
  kasir_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const Config = sequelize.define('Config', {
  config_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING, allowNull: false },
  value: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const OvertimeAssignment = sequelize.define('OvertimeAssignment', {
  overtime_assigment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  overtime_date: { type: DataTypes.DATE, allowNull: false },
  kasir_id: { type: DataTypes.INTEGER, allowNull: false },
  admin_id: { type: DataTypes.INTEGER, allowNull: false },
  overtime_hour: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const Menu = sequelize.define('Menu', {
  menu_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nama_menu: { type: DataTypes.STRING, allowNull: false },
  deskripsi_menu: { type: DataTypes.STRING },
  harga_menu: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const Transaksi = sequelize.define('Transaksi', {
  transaksi_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total_transaksi: { type: DataTypes.INTEGER, allowNull: false },
  kasir_id: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

const TransaksiItem = sequelize.define('TransaksiItem', {
  transaksi_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  transaksi_id: { type: DataTypes.INTEGER, allowNull: false },
  menu_id: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  subtotal: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: new Date() },
  updated_at: { type: DataTypes.DATE },
  deleted_at: { type: DataTypes.DATE },
});

export {
  Admin,
  Kasir,
  Config,
  OvertimeAssignment,
  Menu,
  Transaksi,
  TransaksiItem,
};
