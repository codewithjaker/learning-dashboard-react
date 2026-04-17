'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface SidebarToggleProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsOpen(!isOpen)}
      className="lg:hidden"
    >
      {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  )
}