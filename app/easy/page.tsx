'use client'

import { useState } from 'react'
import SetupTask from '@/components/setup-task'
import PrivacySettingsEasy from '@/components/privacy-settings-easy'

export default function EasyVariantPage() {
  const [taskCompleted, setTaskCompleted] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[1fr_400px] gap-6 p-4 md:p-8">
        {/* Main content area - Primary task */}
        <div>
          <SetupTask onComplete={() => setTaskCompleted(true)} />
        </div>
        
        {/* Side panel - Easy privacy settings */}
        <div className="lg:border-l lg:border-border/40 lg:pl-6">
          <PrivacySettingsEasy isTaskCompleted={taskCompleted} />
        </div>
      </div>
    </div>
  )
}
