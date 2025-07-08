import React, { useState } from 'react';
import Heading from '../Heading';
import Spacing from '../Spacing';
import ColorBox from '../ColorBox';
import Button from '../Button';
import ProductCard from '../ProductCard';
import Pagination from '../Pagination';
import Navigation from '../Navigation';
import { colors, spacing, typography } from '../../design-tokens';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Menu, Tabs } from 'antd';
import { Link } from 'react-router-dom';
// import Navigation from '../Navigation';

const colorKeys = Object.keys(colors);
const spacingKeys = Object.keys(spacing);
const typographyKeys = Object.keys(typography).filter(
  (key) => typeof typography[key] === 'object'
);

const SECTIONS = [
  { key: 'typography', label: 'Typography' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'colors', label: 'Colors' },
  { key: 'buttons', label: 'Buttons' },
  { key: 'productcard', label: 'Product Card' },
  { key: 'pagination', label: 'Pagination' },
  { key: 'navigation', label: 'Navigation' },
];

const TypographyTab = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    {typographyKeys.map((key) => {
      const style = typography[key];
      return (
        <div key={key} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: colors.text, marginBottom: 2 }}>
            <b>{key}</b> &nbsp;
            <span style={{ color: '#888' }}>
              {style.fontSize}, {style.fontWeight}, lineHeight: {style.lineHeight}
            </span>
          </div>
          <span
            style={{
              fontFamily: typography.fontFamily,
              fontSize: style.fontSize,
              fontWeight: style.fontWeight,
              lineHeight: style.lineHeight,
              color: colors.text,
            }}
          >
            The quick brown fox jumps over the lazy dog
          </span>
        </div>
      );
    })}
  </div>
);

const SpacingTab = () => (
  <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
    {spacingKeys.map((key) => (
      <div key={key} style={{ textAlign: 'center', minWidth: 80 }}>
        <div style={{ marginBottom: 8, fontWeight: 500 }}>{key}</div>
        <div style={{ marginBottom: 8, color: '#888', fontSize: 13 }}>{spacing[key]}</div>
        <div style={{ background: '#eee', height: spacing[key], width: 40, margin: '0 auto', borderRadius: 4 }} />
      </div>
    ))}
  </div>
);

const ColorsTab = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
    {colorKeys.map((key) => (
      <div key={key} style={{ textAlign: 'center', minWidth: 100 }}>
        <div style={{
          width: 40,
          height: 40,
          background: colors[key],
          borderRadius: 6,
          border: '1px solid #eee',
          margin: '0 auto 8px',
        }} />
        <div style={{ fontWeight: 500 }}>{key}</div>
        <div style={{ color: '#888', fontSize: 13 }}>{colors[key]}</div>
      </div>
    ))}
  </div>
);

const ButtonsTab = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
    <Button variant="solid">Solid Button</Button>
    <Button variant="outline">Outline Button</Button>
    <Button variant="outline-border">Outline Border Button</Button>
    <Button variant="link" icon={<RightOutlined />} iconPosition="right">Link Right Icon</Button>
    <Button variant="link" icon={<LeftOutlined />} iconPosition="left">Link Left Icon</Button>
  </div>
);

const ProductCardTab = () => (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
    <ProductCard
      type="normal"
      image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop"
      name="Elegant Ring"
      price="$120"
    />
    <ProductCard
      type="sale"
      image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop"
      name="Diamond Necklace"
      price="$99"
      oldPrice="$150"
    />
    <ProductCard
      type="new"
      image="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop"
      name="Pearl Bracelet"
      price="$80"
    />
  </div>
);

const PaginationTab = () => {
  const [dotPage, setDotPage] = useState(2);
  const [numPage, setNumPage] = useState(3);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
      <div>
        <Heading level={3} style={{ marginBottom: 12 }}>Dot Pagination</Heading>
        <Pagination type="dot" total={5} current={dotPage} onChange={setDotPage} />
      </div>
      <div>
        <Heading level={3} style={{ marginBottom: 12 }}>Number Pagination</Heading>
        <Pagination type="number" total={7} current={numPage} onChange={setNumPage} />
      </div>
    </div>
  );
};

const NavigationTab = () => {
  const [active, setActive] = useState('home');
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'shop', label: 'Shop' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' },
  ];
  return (
    <div style={{ maxWidth: 500 }}>
      <Navigation items={items} current={active} onChange={setActive} />
    </div>
  );
};

const TAB_CONTENT = {
  typography: <TypographyTab />,
  spacing: <SpacingTab />,
  colors: <ColorsTab />,
  buttons: <ButtonsTab />,
  productcard: <ProductCardTab />,
  pagination: <PaginationTab />,
  navigation: <NavigationTab />,
};

const DSDashboardScreen = () => {
  const [activeKey, setActiveKey] = useState(SECTIONS[0].key);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fafafa' }}>
      {/* Sidebar Menu */}
      <div style={{ width: 220, background: '#fff', borderRight: `1px solid ${colors.border}`, padding: '32px 0' }}>
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          style={{ border: 'none', fontFamily: typography.fontFamily }}
          onClick={({ key }) => setActiveKey(key)}
        >
          <Menu.Item key="dashboard" disabled style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>
            Design System
          </Menu.Item>
          {SECTIONS.map(section => (
            <Menu.Item key={section.key}>{section.label}</Menu.Item>
          ))}
        </Menu>
      </div>
      {/* Main Content with Tabs */}
      <div style={{ flex: 1, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Heading level={1} style={{ marginBottom: 0 }}>Design System Dashboard</Heading>
          <Link to="/contact">
            <Button type="primary">Liên hệ</Button>
          </Link>
        </div>
        <Tabs
          activeKey={activeKey}
          onChange={setActiveKey}
          items={SECTIONS.map(section => ({
            key: section.key,
            label: section.label,
            children: TAB_CONTENT[section.key],
          }))}
          tabBarStyle={{ marginBottom: 32 }}
        />
      </div>
    </div>
  );
};

export default DSDashboardScreen; 