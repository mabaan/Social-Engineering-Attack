'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Circle, AlertCircle, Sparkles } from 'lucide-react'

interface SetupTaskProps {
  onComplete: () => void
}

export default function SetupTask({ onComplete }: SetupTaskProps) {
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    bio: '',
    interests: [] as string[],
  })
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const interestOptions = [
    'Technology',
    'Sports',
    'Music',
    'Travel',
    'Food',
    'Art',
    'Gaming',
    'Photography',
  ]

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.username) {
        newErrors.username = 'Username is required'
      } else if (formData.username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters'
      }
      if (!formData.displayName) {
        newErrors.displayName = 'Display name is required'
      }
    }
    
    if (step === 2) {
      if (!formData.bio) {
        newErrors.bio = 'Bio is required'
      } else if (formData.bio.length < 20) {
        newErrors.bio = 'Bio must be at least 20 characters'
      }
    }

    if (step === 3) {
      if (formData.interests.length < 3) {
        newErrors.interests = 'Please select at least 3 interests'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      } else {
        handleComplete()
      }
    }
  }

  const handleComplete = () => {
    console.log('[v0] Setup completed with data:', formData)
    setIsCompleted(true)
    onComplete()
  }

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  if (isCompleted) {
    return (
      <div className="max-w-2xl">
        <Card className="p-12 text-center bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle2 className="h-24 w-24 text-primary" />
              <Sparkles className="h-8 w-8 text-primary absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            All Set, {formData.displayName}!
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Your profile has been created successfully. Welcome to the community!
          </p>
          <div className="space-y-3 text-left max-w-md mx-auto mb-8">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Profile Created</p>
                <p className="text-sm text-muted-foreground">@{formData.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Bio Added</p>
                <p className="text-sm text-muted-foreground">{formData.bio.substring(0, 50)}...</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium">Interests Selected</p>
                <p className="text-sm text-muted-foreground">
                  {formData.interests.slice(0, 3).join(', ')}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/70">
            You can now explore all features and customize your experience
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Complete Your Profile Setup
        </h1>
        <p className="text-lg text-muted-foreground">
          Help us personalize your experience by completing these steps
        </p>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          {currentStep > 1 ? (
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          ) : (
            <Circle className="h-6 w-6 text-primary" />
          )}
          <span className={currentStep === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
            Step 1
          </span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2">
          {currentStep > 2 ? (
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          ) : currentStep === 2 ? (
            <Circle className="h-6 w-6 text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground/40" />
          )}
          <span className={currentStep === 2 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
            Step 2
          </span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-2">
          {currentStep === 3 ? (
            <Circle className="h-6 w-6 text-primary" />
          ) : (
            <Circle className="h-6 w-6 text-muted-foreground/40" />
          )}
          <span className={currentStep === 3 ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
            Step 3
          </span>
        </div>
      </div>

      <Card className="p-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Let's start with your profile details</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-base">
                  Username <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Choose a unique username"
                  className="mt-2"
                />
                {errors.username && (
                  <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.username}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="displayName" className="text-base">
                  Display Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="displayName"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  placeholder="How should we call you?"
                  className="mt-2"
                />
                {errors.displayName && (
                  <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {errors.displayName}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Write a brief bio to help others get to know you</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-base">
                Bio <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself... (minimum 20 characters)"
                className="mt-2 min-h-[150px]"
              />
              <p className="text-sm text-muted-foreground mt-2">
                {formData.bio.length} / 20 characters minimum
              </p>
              {errors.bio && (
                <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.bio}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Your Interests</h2>
              <p className="text-muted-foreground">Select at least 3 interests to personalize your feed</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? 'border-primary bg-primary/10 font-semibold'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            {errors.interests && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {errors.interests}
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              Selected: {formData.interests.length} / 3 minimum
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext} size="lg" className="min-w-[120px]">
            {currentStep === 3 ? 'Complete Setup' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
