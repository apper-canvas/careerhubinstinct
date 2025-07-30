import React from "react";
import { useSelector } from "react-redux";
import LogoutButton from "@/components/organisms/LogoutButton";
import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/jobs':
        return 'Jobs';
      case '/candidates':
        return 'Candidates';
      case '/analytics':
        return 'Analytics';
      case '/settings':
        return 'Settings';
      default:
        return 'TalentBridge';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name="Menu" size={20} />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold font-display bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="lg:hidden">
            <h1 className="text-xl font-bold font-display bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              TalentBridge
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ApperIcon name="Bell" size={20} />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ApperIcon name="Settings" size={20} />
          </button>
          <UserProfile />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

function UserProfile() {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  if (!isAuthenticated || !user) {
    return (
      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
        <ApperIcon name="User" size={16} className="text-white" />
      </div>
    );
  }

  const displayName = user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.emailAddress;
  const initials = user.firstName 
    ? `${user.firstName.charAt(0)}${user.lastName ? user.lastName.charAt(0) : ''}`.toUpperCase()
    : user.emailAddress.charAt(0).toUpperCase();

  return (
    <div className="flex items-center space-x-3">
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{displayName}</p>
        <p className="text-xs text-gray-500">{user.emailAddress}</p>
      </div>
      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-semibold">{initials}</span>
      </div>
    </div>
  );
}

export default Header;