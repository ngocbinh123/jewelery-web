import React from 'react';
import { Layout, Menu } from 'antd';
import './Header.css'; // We'll create this file for custom styles
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Assuming the logo is in assets folder
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader className={`${styles.header} header`}>
      <div className={`${styles.logo} logo`}>
        <img src={logo} alt="Ngọc Hải Dương Logo" />
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/collection">Bộ sưu tập</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/about">Về chúng tôi</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/contact">Liên hệ</Link>
        </Menu.Item>
      </Menu>
    </AntHeader>
  );
};

export default Header;