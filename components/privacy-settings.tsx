'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Settings, ChevronDown } from 'lucide-react'

interface PrivacySettingsProps {
  isTaskCompleted: boolean
}

export default function PrivacySettings({ isTaskCompleted }: PrivacySettingsProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    content: false,
    network: false,
    storage: false,
    additional: false,
    system: false,
  })

  const predatorySettings = [
    'behavioralTracking',
    'locationTracking',
    'crossDeviceTracking',
    'biometricData',
    'voiceRecording',
    'cameraAccess',
    'contactsAccess',
    'photoLibraryAccess',
    'microphoneAccess',
    'searchHistory',
    'purchaseHistory',
    'healthData',
    'financialData',
    'dataRetention',
  ]
  
  const [choices, setChoices] = useState<Record<string, boolean>>({
    // Pre-checked boxes (dark pattern) - USELESS/OBVIOUS ones
    enhancedExperience: true,
    personalizedContent: true,
    analyticsTracking: true,
    thirdPartySharing: true,
    marketingEmails: true,
    notificationTracking: true,
    // Hidden - IMPORTANT/PREDATORY ones
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleSaveChoices = () => {
    const enabledPredatorySettings = predatorySettings.filter(key => choices[key]).length
    console.log(`[Privacy Metrics] ${enabledPredatorySettings}/${predatorySettings.length} privacy-invasive options still enabled`)
    console.log('[Privacy Choices]', choices)
    alert('Settings saved! (This is a simulation - no data is actually collected)')
  }

  useEffect(() => {
    if (isTaskCompleted) {
      const enabledPredatorySettings = predatorySettings.filter(key => choices[key]).length
      console.log(`[Privacy Metrics] ${enabledPredatorySettings}/${predatorySettings.length} privacy-invasive options still enabled`)
      console.log('[Privacy Choices]', choices)
    }
  }, [isTaskCompleted])

  return (
    <div className="sticky top-4 h-[calc(100vh-2rem)] flex flex-col">
      
      {/* Header with small privacy info */}
      <div className="flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-muted-foreground/60" />
        <div>
          <h2 className="text-lg font-medium text-muted-foreground/80">Settings</h2>
          <p className="text-xs text-muted-foreground/60">
            Optional configuration
          </p>
        </div>
      </div>

      {/* Prominent button for bad privacy choice */}
      <Card className="p-4 bg-primary/80 text-primary-foreground shadow-md mb-4">
        <div>
          <p className="text-sm font-medium mb-2">Quick Setup</p>
          <Button
            size="sm"
            className="w-full bg-white/90 text-muted-foreground hover:bg-white text-sm border border-border/40"
            onClick={() => {
              Object.keys(choices).forEach(key => {
                setChoices(prev => ({ ...prev, [key]: true }))
              })
            }}
          >
            Enable All Features
          </Button>
        </div>
      </Card>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {/* Obvious/useless settings - prominent */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">App Improvements</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="analytics"
                checked={choices.analyticsTracking}
                onCheckedChange={() => handleToggle('analyticsTracking')}
                className="mt-1 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
              />
              <div className="flex-1">
                <label htmlFor="analytics" className="font-medium text-foreground cursor-pointer">
                  Help improve the app
                </label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Share anonymous usage statistics
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="thirdParty"
                checked={choices.thirdPartySharing}
                onCheckedChange={() => handleToggle('thirdPartySharing')}
                className="mt-1 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
              />
              <div className="flex-1">
                <label htmlFor="thirdParty" className="font-medium text-foreground cursor-pointer">
                  Partner features
                </label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Enable seamless third-party integrations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="marketing"
                checked={choices.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
                className="mt-1 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
              />
              <div className="flex-1">
                <label htmlFor="marketing" className="font-medium text-foreground cursor-pointer">
                  Product updates
                </label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Stay informed about new features
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Personalization</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <label htmlFor="enhanced" className="font-medium text-foreground">
                  Enhanced Experience
                </label>
                <p className="text-sm text-muted-foreground">
                  Recommended for best performance
                </p>
              </div>
              <Switch
                id="enhanced"
                checked={choices.enhancedExperience}
                onCheckedChange={() => handleToggle('enhancedExperience')}
                className="data-[state=checked]:bg-muted-foreground/60"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <label htmlFor="personalized" className="font-medium text-foreground">
                  Personalized Content
                </label>
                <p className="text-sm text-muted-foreground">
                  Show relevant recommendations
                </p>
              </div>
              <Switch
                id="personalized"
                checked={choices.personalizedContent}
                onCheckedChange={() => handleToggle('personalizedContent')}
                className="data-[state=checked]:bg-muted-foreground/60"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <label htmlFor="notifications" className="font-medium text-foreground">
                  Smart Notifications
                </label>
                <p className="text-sm text-muted-foreground">
                  Get timely updates
                </p>
              </div>
              <Switch
                id="notifications"
                checked={choices.notificationTracking}
                onCheckedChange={() => handleToggle('notificationTracking')}
                className="data-[state=checked]:bg-muted-foreground/60"
              />
            </div>
          </div>
        </Card>

        
        {/* Content Optimization - collapsed by default */}
        <Card className="p-4 bg-card/60">
          <button 
            onClick={() => toggleSection('content')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-sm font-medium text-muted-foreground/70">Content Optimization</h3>
            <ChevronDown 
              className={`h-4 w-4 text-muted-foreground/60 transition-transform ${
                expandedSections.content ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSections.content && (
            <div className="space-y-2.5 mt-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="behavioral"
                  checked={choices.behavioralTracking}
                  onCheckedChange={() => handleToggle('behavioralTracking')}
                  className="mt-0.5 opacity-70 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="behavioral" className="text-xs text-muted-foreground/60 cursor-pointer">
                  Activity-based suggestions
                </label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="searchHistory"
                  checked={choices.searchHistory}
                  onCheckedChange={() => handleToggle('searchHistory')}
                  className="mt-0.5 opacity-70 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="searchHistory" className="text-xs text-muted-foreground/60 cursor-pointer">
                  Search improvements
                </label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="purchaseHistory"
                  checked={choices.purchaseHistory}
                  onCheckedChange={() => handleToggle('purchaseHistory')}
                  className="mt-0.5 opacity-70 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="purchaseHistory" className="text-xs text-muted-foreground/60 cursor-pointer">
                  Shopping recommendations
                </label>
              </div>
            </div>
          )}
        </Card>

        {/* Network Settings - collapsed by default */}
        <Card className="p-4 bg-card/50">
          <button 
            onClick={() => toggleSection('network')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-xs font-medium text-muted-foreground/60">Network Settings</h3>
            <ChevronDown 
              className={`h-3.5 w-3.5 text-muted-foreground/50 transition-transform ${
                expandedSections.network ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSections.network && (
            <div className="space-y-2 mt-3">
              <div className="flex items-start gap-2">
                <Checkbox
                  id="location"
                  checked={choices.locationTracking}
                  onCheckedChange={() => handleToggle('locationTracking')}
                  className="mt-0.5 opacity-60 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="location" className="text-[11px] text-muted-foreground/55 cursor-pointer">
                  Location services
                </label>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="crossDevice"
                  checked={choices.crossDeviceTracking}
                  onCheckedChange={() => handleToggle('crossDeviceTracking')}
                  className="mt-0.5 opacity-60 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="crossDevice" className="text-[11px] text-muted-foreground/55 cursor-pointer">
                  Device synchronization
                </label>
              </div>
            </div>
          )}
        </Card>

        {/* Storage Options - collapsed by default */}
        <Card className="p-3 bg-card/40">
          <button 
            onClick={() => toggleSection('storage')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-[11px] font-medium text-muted-foreground/50">Storage Options</h3>
            <ChevronDown 
              className={`h-3 w-3 text-muted-foreground/45 transition-transform ${
                expandedSections.storage ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSections.storage && (
            <div className="space-y-1.5 mt-2">
              <div className="flex items-start gap-1.5">
                <Checkbox
                  id="dataRetention"
                  checked={choices.dataRetention}
                  onCheckedChange={() => handleToggle('dataRetention')}
                  className="mt-0.5 opacity-50 h-3 w-3 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="dataRetention" className="text-[10px] text-muted-foreground/45 cursor-pointer">
                  Extended cache
                </label>
              </div>
            </div>
          )}
        </Card>

        {/* Additional Features - collapsed by default */}
        <Card className="p-3 bg-card/30">
          <button 
            onClick={() => toggleSection('additional')}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="text-[10px] font-medium text-muted-foreground/45">Additional Features</h3>
            <ChevronDown 
              className={`h-2.5 w-2.5 text-muted-foreground/40 transition-transform ${
                expandedSections.additional ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSections.additional && (
            <div className="space-y-1.5 mt-2">
              <div className="flex items-start gap-1.5">
                <Checkbox
                  id="healthData"
                  checked={choices.healthData}
                  onCheckedChange={() => handleToggle('healthData')}
                  className="mt-0.5 opacity-45 h-3 w-3 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="healthData" className="text-[9px] text-muted-foreground/40 cursor-pointer">
                  Wellness integration
                </label>
              </div>

              <div className="flex items-start gap-1.5">
                <Checkbox
                  id="financialData"
                  checked={choices.financialData}
                  onCheckedChange={() => handleToggle('financialData')}
                  className="mt-0.5 opacity-45 h-3 w-3 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="financialData" className="text-[9px] text-muted-foreground/40 cursor-pointer">
                  Payment info
                </label>
              </div>
            </div>
          )}
        </Card>

        {/* System - most predatory settings, barely visible */}
        <div className="pt-1">
          <button 
            onClick={() => toggleSection('system')}
            className="w-full flex items-center justify-between text-left px-1 py-1"
          >
            <h3 className="text-[9px] font-medium text-muted-foreground/35">System</h3>
            <ChevronDown 
              className={`h-2 w-2 text-muted-foreground/30 transition-transform ${
                expandedSections.system ? 'rotate-180' : ''
              }`} 
            />
          </button>
          
          {expandedSections.system && (
            <div className="space-y-1 mt-1 px-1">
              <div className="flex items-start gap-1">
                <Checkbox
                  id="biometric"
                  checked={choices.biometricData}
                  onCheckedChange={() => handleToggle('biometricData')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="biometric" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Biometric data
                </label>
              </div>

              <div className="flex items-start gap-1">
                <Checkbox
                  id="voice"
                  checked={choices.voiceRecording}
                  onCheckedChange={() => handleToggle('voiceRecording')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="voice" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Voice recording
                </label>
              </div>

              <div className="flex items-start gap-1">
                <Checkbox
                  id="camera"
                  checked={choices.cameraAccess}
                  onCheckedChange={() => handleToggle('cameraAccess')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="camera" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Camera access
                </label>
              </div>

              <div className="flex items-start gap-1">
                <Checkbox
                  id="microphone"
                  checked={choices.microphoneAccess}
                  onCheckedChange={() => handleToggle('microphoneAccess')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="microphone" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Microphone access
                </label>
              </div>

              <div className="flex items-start gap-1">
                <Checkbox
                  id="contacts"
                  checked={choices.contactsAccess}
                  onCheckedChange={() => handleToggle('contactsAccess')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="contacts" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Contacts
                </label>
              </div>

              <div className="flex items-start gap-1">
                <Checkbox
                  id="photos"
                  checked={choices.photoLibraryAccess}
                  onCheckedChange={() => handleToggle('photoLibraryAccess')}
                  className="mt-0.5 opacity-40 h-2.5 w-2.5 border-muted-foreground/40 data-[state=checked]:bg-muted-foreground/60 data-[state=checked]:border-muted-foreground/60"
                />
                <label htmlFor="photos" className="text-[8px] text-muted-foreground/35 cursor-pointer">
                  Photo library
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with save button */}
      <div className="pt-3 border-t border-border/20">
        <Button 
          onClick={handleSaveChoices} 
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          Save Settings
        </Button>

        {/* Research notice */}
        <div className="mt-3 p-3 bg-muted/30 rounded border border-border/20">
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
            <strong>Research Notice:</strong> Simulated interface for UX research. 
            No actual data is collected.
          </p>
        </div>
      </div>
    </div>
  )
}
