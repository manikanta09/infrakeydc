import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { CommandPalette, useCommandPalette } from '@/components/shared/CommandPalette'

export function AppLayout() {
  const { sidebarCollapsed } = useUIStore()
  const { open, close } = useCommandPalette()
  const sidebarWidth = sidebarCollapsed ? 60 : 240

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar />
      <TopNav />

      <motion.main
        animate={{ paddingLeft: sidebarWidth }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen pt-[60px] max-lg:!pl-0"
        id="main-content"
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </motion.main>

      {/* CommandPalette lives here — inside RouterProvider, so useNavigate works */}
      <CommandPalette open={open} onClose={close} />
    </div>
  )
}
