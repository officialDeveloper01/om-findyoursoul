
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, User, Phone, Plus, AlertCircle } from 'lucide-react';
import { RelativeForm } from './RelativeForm';
import { TimeInput } from './TimeInput';
import { useAuth } from '@/hooks/useAuth';
import { ref, get } from 'firebase/database';
import { database } from '@/config/firebase';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const UserDataForm = ({ onSubmit }) => {
  const [mainFormData, setMainFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    mobileNumber: ''
  });
  
  const [relatives, setRelatives] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [isCheckingMobile, setIsCheckingMobile] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { user } = useAuth();

  const validateMobileNumber = (mobile) => {
    // Remove any non-digit characters
    const cleaned = mobile.replace(/\D/g, '');
    
    // Check if it starts with a valid digit (not 0 or 1)
    if (cleaned[0] === '0' || cleaned[0] === '1') {
      return false;
    }
    
    return true;
  };

  const checkMobileExists = async (mobile) => {
    if (!mobile || mobile.length !== 10) return false;
    
    try {
      const userRef = ref(database, `users/${mobile}`);
      const snapshot = await get(userRef);
      return snapshot.exists();
    } catch (error) {
      console.error('Error checking mobile number:', error);
      return false;
    }
  };

  const validateMainForm = () => {
    const requiredFields = [
      { field: 'fullName', label: 'Full Name' },
      { field: 'dateOfBirth', label: 'Date of Birth' },
      { field: 'timeOfBirth', label: 'Time of Birth' },
      { field: 'placeOfBirth', label: 'Place of Birth' },
      { field: 'mobileNumber', label: 'Mobile Number' }
    ];

    const missingFields = requiredFields.filter(({ field }) => !mainFormData[field] || mainFormData[field].trim() === '');
    
    if (missingFields.length > 0) {
      return `Please fill in all required fields in the main form: ${missingFields.map(f => f.label).join(', ')}`;
    }

    if (mainFormData.mobileNumber && !validateMobileNumber(mainFormData.mobileNumber)) {
      return 'Please enter a valid 10-digit mobile number';
    }

    return null;
  };

  const validateRelatives = () => {
    if (relatives.length === 0) return null;

    const requiredFields = ['fullName', 'relation', 'dateOfBirth', 'timeOfBirth', 'placeOfBirth'];
    
    for (let i = 0; i < relatives.length; i++) {
      const relative = relatives[i];
      const missingFields = requiredFields.filter(field => !relative[field] || relative[field].trim() === '');
      
      if (missingFields.length > 0) {
        return `Please complete all fields in Family Member #${i + 1}: ${missingFields.join(', ')}`;
      }
    }

    return null;
  };

  const handleMainInputChange = async (field, value) => {
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('');
    }

    if (field === 'mobileNumber') {
      // Remove any non-digit characters
      const cleaned = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limited = cleaned.slice(0, 10);
      
      setMainFormData(prev => ({
        ...prev,
        [field]: limited
      }));

      // Clear previous errors
      setMobileError('');

      // Validate if we have a complete number
      if (limited.length === 10) {
        if (!validateMobileNumber(limited)) {
          setMobileError('Please enter a valid 10-digit mobile number');
          return;
        }

        // Check for duplicates
        setIsCheckingMobile(true);
        try {
          const exists = await checkMobileExists(limited);
          if (exists) {
            setMobileError('This mobile number is already registered. Please search the records instead.');
          }
        } catch (error) {
          console.error('Error checking mobile:', error);
        } finally {
          setIsCheckingMobile(false);
        }
      } else if (limited.length > 0 && limited.length < 10) {
        setMobileError('Mobile number must be 10 digits');
      }
    } else {
      setMainFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addRelative = () => {
    // Validate main form before allowing to add relatives
    const mainFormError = validateMainForm();
    if (mainFormError) {
      setValidationError(mainFormError);
      return;
    }

    setRelatives(prev => [...prev, {
      fullName: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      relation: ''
    }]);
  };

  const removeRelative = (index) => {
    setRelatives(prev => prev.filter((_, i) => i !== index));
  };

  const updateRelative = (relativeData, index) => {
    // Clear validation error when user updates relative data
    if (validationError) {
      setValidationError('');
    }
    
    setRelatives(prev => prev.map((rel, i) => i === index ? relativeData : rel));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setValidationError('Please sign in to save records.');
      return;
    }
    
    if (isSubmitting) {
      console.log('Form already submitting, ignoring...');
      return;
    }

    // Comprehensive validation
    const mainFormError = validateMainForm();
    if (mainFormError) {
      setValidationError(mainFormError);
      return;
    }

    const relativesError = validateRelatives();
    if (relativesError) {
      setValidationError(relativesError);
      return;
    }

    // Check for mobile number errors
    if (mobileError) {
      setValidationError(mobileError);
      return;
    }

    // Check for duplicates one more time before submission
    setIsCheckingMobile(true);
    try {
      const exists = await checkMobileExists(mainFormData.mobileNumber);
      if (exists) {
        setMobileError('This mobile number is already registered. Please search the records instead.');
        setIsCheckingMobile(false);
        setValidationError('This mobile number is already registered. Please search the records instead.');
        return;
      }
    } catch (error) {
      console.error('Error checking mobile:', error);
      setIsCheckingMobile(false);
      return;
    }
    setIsCheckingMobile(false);

    // Filter out incomplete relatives (this shouldn't happen now due to validation)
    const completeRelatives = relatives.filter(rel => 
      rel.fullName && 
      rel.dateOfBirth && 
      rel.timeOfBirth && 
      rel.placeOfBirth && 
      rel.relation
    );

    // Prepare entries array with main user first, including user ID
    const entries = [
      {
        ...mainFormData,
        relation: 'SELF',
        createdBy: user.uid
      },
      ...completeRelatives.map(rel => ({
        ...rel,
        createdBy: user.uid
      }))
    ];

    console.log('Submitting entries with user ID:', entries);
    console.log('Complete relatives found:', completeRelatives.length);
    
    setIsSubmitting(true);
    setValidationError('');
    
    try {
      await onSubmit({
        phoneNumber: mainFormData.mobileNumber,
        entries,
        userId: user.uid
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setValidationError('An error occurred while saving. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user is logged in
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Please sign in to create records.</p>
            <Button 
              onClick={() => window.location.href = '/login'}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isMainFormValid = mainFormData.fullName && mainFormData.dateOfBirth && mainFormData.timeOfBirth && mainFormData.placeOfBirth && mainFormData.mobileNumber && !mobileError && validateMobileNumber(mainFormData.mobileNumber);
  const validRelativesCount = relatives.filter(rel => rel.fullName && rel.dateOfBirth && rel.timeOfBirth && rel.placeOfBirth && rel.relation).length;

  return (
    <div className="space-y-6">
      {/* Validation Error Alert */}
      {validationError && (
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {validationError}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main User Form */}
      <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-light text-gray-700">
            Primary User Details
          </CardTitle>
          <p className="text-gray-500 mt-2 font-large">
            Please provide your accurate birth information for precise calculations
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2 text-gray-700">
                  <User size={16} />
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  value={mainFormData.fullName}
                  onChange={(e) => handleMainInputChange('fullName', e.target.value)}
                  placeholder="Enter your complete name"
                  className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-2 text-gray-700">
                  <Calendar size={16} />
                  Date of Birth (DD-MM-YYYY) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={mainFormData.dateOfBirth}
                  onChange={(e) => handleMainInputChange('dateOfBirth', e.target.value)}
                  className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeOfBirth" className="flex items-center gap-2 text-gray-700">
                  Time of Birth <span className="text-red-500">*</span>
                </Label>
                <TimeInput
                  value={mainFormData.timeOfBirth}
                  onChange={(value) => handleMainInputChange('timeOfBirth', value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeOfBirth" className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} />
                  Place of Birth <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="placeOfBirth"
                  type="text"
                  value={mainFormData.placeOfBirth}
                  onChange={(e) => handleMainInputChange('placeOfBirth', e.target.value)}
                  placeholder="City, State, Country"
                  className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber" className="flex items-center gap-2 text-gray-700">
                  <Phone size={16} />
                  Mobile Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={mainFormData.mobileNumber}
                  onChange={(e) => handleMainInputChange('mobileNumber', e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  className={`border-gray-200 focus:border-amber-400 focus:ring-amber-400 ${mobileError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  disabled={isSubmitting || isCheckingMobile}
                />
                {(mobileError || isCheckingMobile) && (
                  <div className="flex items-center gap-2 text-sm">
                    {isCheckingMobile ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-amber-600 border-t-transparent rounded-full"></div>
                        <span className="text-amber-600">Checking mobile number...</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={16} className="text-red-500" />
                        <span className="text-red-500">{mobileError}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relatives Forms */}
      {relatives.map((relative, index) => (
        <div key={index} className="max-w-2xl mx-auto">
          <RelativeForm
            onUpdate={updateRelative}
            onRemove={removeRelative}
            index={index}
            initialData={relative}
          />
        </div>
      ))}

      {isMainFormValid && (
        <div className="text-center">
          <Button
            type="button"
            variant="outline"
            onClick={addRelative}
            className="border-amber-300 text-amber-700 hover:bg-amber-50"
            disabled={isSubmitting}
          >
            <Plus size={16} className="mr-2" />
            Add Family Member
          </Button>
        </div>
      )}
      
      {/* Submit Button */}
      {isMainFormValid && (
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <Button 
                onClick={handleSubmit}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-light tracking-wide disabled:opacity-50"
                disabled={!isMainFormValid || isSubmitting}
              >
                {isSubmitting ? 'Calculating...' : `Calculate Sacred Grid${validRelativesCount > 0 ? ` (${validRelativesCount + 1} people)` : ''}`}
              </Button>
              {validRelativesCount > 0 && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  Including {validRelativesCount} family member{validRelativesCount > 1 ? 's' : ''}
                </p>
              )}
              
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
