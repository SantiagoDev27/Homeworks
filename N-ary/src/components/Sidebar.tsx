import React, { useState } from 'react';
import { type MenuNode, menuTree } from '../data/menuData';
import './Sidebar.css';

interface SidebarItemProps {
    node: MenuNode;
    level: number;
    activePath: string; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({ node, level, activePath }) => {
    const [isOpen, setIsOpen] = useState(true); 
    const hasChildren = node.children && node.children.length > 0;
    const isActive = activePath === node.link;

    const toggleSubmenu = (e: React.MouseEvent) => {
        if (hasChildren) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    };

    return (
        <>
            <div
                className={`menu-item ${isActive ? 'active' : ''}`}
                style={{ paddingLeft: `${(level * 20) + 20}px` }} 
                onClick={toggleSubmenu}
            >
                <a href={hasChildren ? '#' : node.link} className="menu-link">
                    {node.title}
                </a>

                {hasChildren && (
                    <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
                )}
            </div>

            {isOpen && hasChildren && (
                <div className="submenu-container">
                    {node.children!.map((child, index) => (
                        <SidebarItem
                            key={index}
                            node={child}
                            level={level + 1}
                            activePath={activePath}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export const Sidebar: React.FC = () => {
    const currentPath = '/settings/security';

    return (
        <div className="sidebar-container">
            <nav className="sidebar-nav">
                {menuTree.map((menuNode, index) => (
                    <SidebarItem
                        key={index}
                        node={menuNode}
                        level={0}
                        activePath={currentPath}
                    />
                ))}
            </nav>
        </div>
    );
};