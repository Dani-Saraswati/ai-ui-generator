import Button from './library/Button';
import Card from './library/Card';
import Input from './library/Input';
import Table from './library/Table';
import Modal from './library/Modal';
import Sidebar from './library/Sidebar';
import Navbar from './library/Navbar';
import Chart from './library/Chart';

export const ComponentRegistry: Record<string, any> = {
  Button,
  Card,
  Input,
  Table,
  Modal,
  Sidebar,
  Navbar,
  Chart,
};

export const ALLOWED_COMPONENTS = [
  'Button',
  'Card', 
  'Input',
  'Table',
  'Modal',
  'Sidebar',
  'Navbar',
  'Chart',
];