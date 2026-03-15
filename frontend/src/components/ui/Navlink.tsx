import { NavLink as BaseNavLink, type NavLinkProps } from 'react-router-dom'

interface MyNavLinkProps extends NavLinkProps {
  to: string
}

export const Navlink = ({ children, to, ...props }: MyNavLinkProps) => {
  return (
    <BaseNavLink
      {...props}
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-md p-1.5 text-sm font-medium ${isActive ? 'bg-blue-100 text-blue-500 hover:bg-blue-200' : 'hover:bg-gray-100'}`
      }
    >
      {children}
    </BaseNavLink>
  )
}
