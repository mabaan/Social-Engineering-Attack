'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Shield, ShieldCheck } from 'lucide-react'

interface PrivacySettingsEasyProps {
  isTaskCompleted: boolean
}

export default function PrivacySettingsEasy({ isTaskCompleted }: PrivacySettingsEasyProps) {
  const predatorySettings = [
    'analyticsTracking',
    'thirdPartySharing',
    'marketingEmails',
    'behavioralTracking',
    'locationTracking',
    'dataRetention',
    'crossDeviceTracking',
    'biometricData',
    'voiceRecording',
    'cameraAccess',
    'contactsAccess',
    'photoLibraryAccess',
    'microphoneAccess',
    'notificationTracking',
    'searchHistory',
    'purchaseHistory',
    'healthData',
    'financialData',
  ]
  
  const [choices, setChoices] = useState<Record<string, boolean>>({
    enhancedExperience: false,
    personalizedContent: false,
    analyticsTracking: true,
    thirdPartySharing: true,
    marketingEmails: true,
    behavioralTracking: true,
    locationTracking: true,
    dataRetention: true,
    crossDeviceTracking: true,
    biometricData: true,
    voiceRecording: true,
    cameraAccess: true,
    contactsAccess: true,
    photoLibraryAccess: true,
    microphoneAccess: true,
    notificationTracking: true,
    searchHistory: true,
    purchaseHistory: true,
    healthData: true,
    financialData: true,
  })

  const calculatePrivacyScore = () => {
    const disabledPredatorySettings = predatorySettings.filter(key => !choices[key])
    return disabledPredatorySettings.length
  }

  const handleToggle = (key: string) => {
    setChoices(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSaveChoices = () => {
    const enabledPredatorySettings = predatorySettings.filter(key => choices[key]).length
    console.log(`[Privacy Metrics - Easy] ${enabledPredatorySettings}/${predatorySettings.length} privacy-invasive options still enabled`)
    console.log('[Privacy Choices - Easy]', choices)
    alert('Settings saved! (This is a simulation - no data is actually collected)')
  }

  useEffect(() => {
    if (isTaskCompleted) {
      const privacyScore = calculatePrivacyScore()
      console.log('[v0] Main task completed (Easy variant). Privacy choices:', choices)
      console.log('[v0] Privacy Protection Score (Easy variant):', privacyScore, '/', predatorySettings.length)
    }
  }, [isTaskCompleted])

  return (
    <div className="sticky top-4 h-fit">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Shield className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Privacy Controls</h2>
          <p className="text-xs text-muted-foreground">
            Manage your data preferences
          </p>
        </div>
      </div>

      <Card className="p-4 mb-3 border-2 border-blue-200 bg-blue-50">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-bold text-blue-900">
            Data Collection & Tracking
          </h3>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="behavioral" className="text-sm font-medium text-foreground">
              Behavioral Tracking
            </label>
            <Switch
              id="behavioral"
              checked={choices.behavioralTracking}
              onCheckedChange={() => handleToggle('behavioralTracking')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="location" className="text-sm font-medium text-foreground">
              Location Tracking
            </label>
            <Switch
              id="location"
              checked={choices.locationTracking}
              onCheckedChange={() => handleToggle('locationTracking')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="searchHistory" className="text-sm font-medium text-foreground">
              Search History
            </label>
            <Switch
              id="searchHistory"
              checked={choices.searchHistory}
              onCheckedChange={() => handleToggle('searchHistory')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="purchaseHistory" className="text-sm font-medium text-foreground">
              Purchase History
            </label>
            <Switch
              id="purchaseHistory"
              checked={choices.purchaseHistory}
              onCheckedChange={() => handleToggle('purchaseHistory')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="crossDevice" className="text-sm font-medium text-foreground">
              Cross-Device Tracking
            </label>
            <Switch
              id="crossDevice"
              checked={choices.crossDeviceTracking}
              onCheckedChange={() => handleToggle('crossDeviceTracking')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-blue-200">
            <label htmlFor="dataRetention" className="text-sm font-medium text-foreground">
              Extended Data Storage
            </label>
            <Switch
              id="dataRetention"
              checked={choices.dataRetention}
              onCheckedChange={() => handleToggle('dataRetention')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-3 border-2 border-purple-200 bg-purple-50">
        <h3 className="text-sm font-bold text-purple-900 mb-3">
          Sensitive Personal Data
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between p-2 bg-white rounded border border-purple-200">
            <label htmlFor="healthData" className="text-sm font-medium text-foreground">
              Health Data
            </label>
            <Switch
              id="healthData"
              checked={choices.healthData}
              onCheckedChange={() => handleToggle('healthData')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-purple-200">
            <label htmlFor="financialData" className="text-sm font-medium text-foreground">
              Financial Data
            </label>
            <Switch
              id="financialData"
              checked={choices.financialData}
              onCheckedChange={() => handleToggle('financialData')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-purple-200">
            <label htmlFor="biometric" className="text-sm font-medium text-foreground">
              Biometric Data
            </label>
            <Switch
              id="biometric"
              checked={choices.biometricData}
              onCheckedChange={() => handleToggle('biometricData')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-3 border-2 border-green-200 bg-green-50">
        <h3 className="text-sm font-bold text-green-900 mb-3">
          Device Permissions
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between p-2 bg-white rounded border border-green-200">
            <label htmlFor="camera" className="text-sm font-medium text-foreground">
              Camera Access
            </label>
            <Switch
              id="camera"
              checked={choices.cameraAccess}
              onCheckedChange={() => handleToggle('cameraAccess')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-green-200">
            <label htmlFor="microphone" className="text-sm font-medium text-foreground">
              Microphone Access
            </label>
            <Switch
              id="microphone"
              checked={choices.microphoneAccess}
              onCheckedChange={() => handleToggle('microphoneAccess')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-green-200">
            <label htmlFor="voice" className="text-sm font-medium text-foreground">
              Voice Recording
            </label>
            <Switch
              id="voice"
              checked={choices.voiceRecording}
              onCheckedChange={() => handleToggle('voiceRecording')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-green-200">
            <label htmlFor="contacts" className="text-sm font-medium text-foreground">
              Contacts Access
            </label>
            <Switch
              id="contacts"
              checked={choices.contactsAccess}
              onCheckedChange={() => handleToggle('contactsAccess')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>

          <div className="flex items-center justify-between p-2 bg-white rounded border border-green-200">
            <label htmlFor="photos" className="text-sm font-medium text-foreground">
              Photo Library
            </label>
            <Switch
              id="photos"
              checked={choices.photoLibraryAccess}
              onCheckedChange={() => handleToggle('photoLibraryAccess')}
              className="data-[state=checked]:bg-red-500"
            />
          </div>
        </div>
      </Card>

      <Button 
        onClick={handleSaveChoices} 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11"
      >
        Save Privacy Settings
      </Button>

      <div className="mt-3 p-2 bg-muted/30 rounded border border-border/20">
        <p className="text-[10px] text-muted-foreground/60 text-center">
          Research simulation - No data collected
        </p>
      </div>
    </div>
  )
}
