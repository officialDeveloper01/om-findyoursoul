
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ref, get, set, remove, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '@/config/firebase';
import { Phone, Calendar, MapPin, Clock, Edit, Plus, Trash2, User } from 'lucide-react';
import { LoshoGrid } from './LoshoGrid';
import { UserManagementModal } from './UserManagementModal';
import { useAuth } from '@/hooks/useAuth';
import { calculateAllNumerology } from '@/utils/numerologyCalculator';

interface SearchTablesProps {
  onBackToSearch?: () => void;
  onShowingResults?: (showing: boolean) => void;
}

export const SearchTables = ({ onBackToSearch, onShowingResults }: SearchTablesProps = {}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedResults, setSelectedResults] = useState([]);
  const [currentGroupId, setCurrentGroupId] = useState('');
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('');
  const [managementModal, setManagementModal] = useState({
    isOpen: false,
    mode: 'add' as 'add' | 'edit',
    userData: null,
    userIndex: -1
  });
  const { user } = useAuth();

  const [searchResultInfo, setSearchResultInfo] = useState('');

  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      alert('Please sign in to search your records.');
      return;
    }

    if (!fullName.trim() && !mobileNumber.trim()) {
      alert('Please enter either a name or mobile number to search.');
      return;
    }

    setLoading(true);
    setSearched(true);
    setSelectedResults([]);
    setSearchResultInfo('');
    
    try {
      // Search through all users data
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      let results: any[] = [];
      const familyGroupsFound = new Set(); // Track unique family groups
      let searchType = '';
      
      if (snapshot.exists()) {
        const allUsers = snapshot.val();
        
        // Helper function to check numerology number matches
        const checkNumerologyMatch = (entry: any, searchNumber: string) => {
          if (!entry.numerologyData) return false;
          const num = searchNumber.trim();
          const nameNumber = entry.numerologyData.chaldeanNumbers?.nameNumber?.toString();
          const driver = entry.numerologyData.driver?.toString();
          const conductor = entry.numerologyData.conductor?.toString();
          
          return nameNumber === num || driver === num || conductor === num;
        };

        // Helper function to perform search with given criteria
        const performSearch = (nameOnly = false, numberOnly = false, numerologyOnly = false) => {
          const searchResults: any[] = [];
          const groupsFound = new Set();
          
          Object.keys(allUsers).forEach(phoneNumber => {
            const phoneData = allUsers[phoneNumber];
            
            if (phoneData.entries) {
              Object.keys(phoneData.entries).forEach(entryId => {
                const entryGroup = phoneData.entries[entryId];
                
                if (entryGroup.userId === user.uid && entryGroup.entries && Array.isArray(entryGroup.entries)) {
                  const hasMatch = entryGroup.entries.some((entry: any) => {
                    let nameMatches = true;
                    let mobileMatches = true;
                    let numerologyMatches = true;
                    
                    if (!nameOnly && !numerologyOnly) {
                      // Check mobile number match
                      mobileMatches = !mobileNumber.trim() || phoneNumber.includes(mobileNumber.trim());
                    }
                    
                    if (!numberOnly && !numerologyOnly) {
                      // Check name match
                      nameMatches = !fullName.trim() || (entry.fullName && 
                        entry.fullName.toLowerCase().includes(fullName.toLowerCase()));
                    }
                    
                    if (numerologyOnly) {
                      // Check numerology number match
                      numerologyMatches = mobileNumber.trim() ? checkNumerologyMatch(entry, mobileNumber) : false;
                      nameMatches = !fullName.trim() || (entry.fullName && 
                        entry.fullName.toLowerCase().includes(fullName.toLowerCase()));
                    }
                    
                    if (nameOnly) {
                      return nameMatches;
                    }
                    if (numberOnly) {
                      return mobileMatches;
                    }
                    if (numerologyOnly) {
                      return nameMatches && numerologyMatches;
                    }
                    
                    return nameMatches && mobileMatches;
                  });

                  if (hasMatch && !groupsFound.has(entryId)) {
                    groupsFound.add(entryId);
                    
                    entryGroup.entries.forEach((entry: any, index: number) => {
                      searchResults.push({
                        id: `${entryId}-${index}`,
                        groupId: entryId,
                        phoneNumber: phoneNumber,
                        ...entry,
                        createdAt: entryGroup.createdAt,
                        userId: entryGroup.userId
                      });
                    });
                  }
                }
              });
            }
          });
          
          return searchResults;
        };

        // Search strategy based on input
        if (fullName.trim() && mobileNumber.trim()) {
          // Both name and number provided
          results = performSearch(); // Try exact match first
          
          if (results.length === 0) {
            // Try name only
            results = performSearch(true, false);
            if (results.length > 0) {
              searchType = 'name only (mobile number not found)';
            } else {
              // Try mobile number only
              results = performSearch(false, true);
              if (results.length > 0) {
                searchType = 'mobile number only (name not found)';
              } else {
                // Try numerology numbers
                results = performSearch(false, false, true);
                if (results.length > 0) {
                  searchType = 'numerology number match (mobile number was numerology data)';
                }
              }
            }
          } else {
            searchType = 'exact match found';
          }
        } else if (fullName.trim() && !mobileNumber.trim()) {
          // Only name provided
          results = performSearch(true, false);
          searchType = 'name search';
        } else if (!fullName.trim() && mobileNumber.trim()) {
          // Only number provided
          results = performSearch(false, true); // Try mobile number first
          
          if (results.length === 0) {
            // Try numerology numbers
            results = performSearch(false, false, true);
            if (results.length > 0) {
              searchType = 'numerology number match';
            }
          } else {
            searchType = 'mobile number search';
          }
        }
      }
      
      console.log('Search results (full family groups):', results);
      setSearchResults(results);
      setSearchResultInfo(searchType);
    } catch (error) {
      console.error('Error searching records:', error);
      alert('Error searching records. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [fullName, mobileNumber, user]);

  const handleShowResults = useCallback((groupId: string) => {
    console.log('Showing results for group:', groupId);
    
    // Get all entries from the same group
    const groupResults = searchResults.filter(result => result.groupId === groupId);
    
    const formattedResults = groupResults.map(result => ({
      fullName: result.fullName,
      dateOfBirth: result.dateOfBirth,
      timeOfBirth: result.timeOfBirth,
      placeOfBirth: result.placeOfBirth,
      relation: result.relation,
      phoneNumber: result.phoneNumber,
      gridData: result.gridData,
      numerologyData: result.numerologyData
    }));
    
    // Store the current group ID and phone number for updates
    setCurrentGroupId(groupId);
    setCurrentPhoneNumber(groupResults[0]?.phoneNumber || '');
    
    // Notify parent that we're showing results
    onShowingResults?.(true);
    
    // iOS-safe state update
    requestAnimationFrame(() => {
      setSelectedResults(formattedResults);
    });
  }, [searchResults, onShowingResults]);

  const refreshFamilyGroup = useCallback(async () => {
    if (!currentGroupId || !currentPhoneNumber || !user) return;

    try {
      const entriesRef = ref(database, `users/${currentPhoneNumber}/entries/${currentGroupId}`);
      const snapshot = await get(entriesRef);
      
      if (snapshot.exists()) {
        const entryGroup = snapshot.val();
        if (entryGroup.entries && Array.isArray(entryGroup.entries)) {
          const refreshedResults = entryGroup.entries.map((entry: any) => ({
            fullName: entry.fullName,
            dateOfBirth: entry.dateOfBirth,
            timeOfBirth: entry.timeOfBirth,
            placeOfBirth: entry.placeOfBirth,
            relation: entry.relation,
            phoneNumber: currentPhoneNumber,
            gridData: entry.gridData,
            numerologyData: entry.numerologyData
          }));
          
          setSelectedResults(refreshedResults);
          console.log('Family group refreshed with updated data');
        }
      }
    } catch (error) {
      console.error('Error refreshing family group:', error);
    }
  }, [currentGroupId, currentPhoneNumber, user]);

  const handleBackToSearch = useCallback(() => {
    // Notify parent that we're no longer showing results
    onShowingResults?.(false);
    
    // Call parent's back handler if provided
    if (onBackToSearch) {
      onBackToSearch();
    }
    
    // iOS-safe state update
    requestAnimationFrame(() => {
      setSelectedResults([]);
      setCurrentGroupId('');
      setCurrentPhoneNumber('');
    });
  }, [onBackToSearch, onShowingResults]);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Please sign in to search your records.</p>
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

  // CRUD Operations
  const openUserModal = (mode: 'add' | 'edit', userData: any = null, userIndex: number = -1) => {
    setManagementModal({
      isOpen: true,
      mode,
      userData,
      userIndex
    });
  };

  const closeUserModal = () => {
    setManagementModal({
      isOpen: false,
      mode: 'add',
      userData: null,
      userIndex: -1
    });
  };

  const handleUserSave = async (userData: any) => {
    if (!user) {
      alert('Please sign in to save records.');
      return;
    }

    try {
      let updatedResults = [...selectedResults];
      
      if (managementModal.mode === 'add') {
        // Add new family member
        const calculatedNumerology = calculateAllNumerology(userData.dateOfBirth, userData.fullName);
        const newUser = {
          fullName: userData.fullName,
          dateOfBirth: userData.dateOfBirth,
          timeOfBirth: userData.timeOfBirth,
          placeOfBirth: userData.placeOfBirth,
          relation: userData.relation,
          phoneNumber: currentPhoneNumber,
          gridData: calculatedNumerology.loshuGrid,
          numerologyData: calculatedNumerology,
          createdAt: new Date().toISOString()
        };
        updatedResults.push(newUser);
      } else {
        // Edit existing user
        const calculatedNumerology = calculateAllNumerology(userData.dateOfBirth, userData.fullName);
        updatedResults[managementModal.userIndex] = {
          ...updatedResults[managementModal.userIndex],
          fullName: userData.fullName,
          dateOfBirth: userData.dateOfBirth,
          timeOfBirth: userData.timeOfBirth,
          placeOfBirth: userData.placeOfBirth,
          relation: userData.relation || updatedResults[managementModal.userIndex].relation,
          phoneNumber: currentPhoneNumber,
          gridData: calculatedNumerology.loshuGrid,
          numerologyData: calculatedNumerology
        };
      }

      // Update Firebase - Update existing group with user ID
      if (updatedResults.length > 0 && currentPhoneNumber && currentGroupId) {
        const entriesRef = ref(database, `users/${currentPhoneNumber}/entries/${currentGroupId}`);
        await set(entriesRef, {
          entries: updatedResults,
          phoneNumber: currentPhoneNumber,
          createdAt: new Date().toISOString(),
          userId: user.uid
        });

        console.log('Updated existing group:', currentGroupId);
        
        // Update local state first for immediate UI feedback
        setSelectedResults(updatedResults);
        
        // Then refresh from database to confirm persistence
        await refreshFamilyGroup();
        
        // Show success message
        alert('Record updated successfully!');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error updating record. Please try again.');
      throw error;
    }
  };

  const handleUserDelete = async () => {
    if (!user) {
      alert('Please sign in to delete records.');
      return;
    }

    try {
      const updatedResults = selectedResults.filter((_, index) => index !== managementModal.userIndex);
      
      // Update Firebase
      if (currentPhoneNumber && currentGroupId) {
        if (updatedResults.length > 0) {
          // Update the existing group entry
          const entriesRef = ref(database, `users/${currentPhoneNumber}/entries/${currentGroupId}`);
          await set(entriesRef, {
            entries: updatedResults,
            phoneNumber: currentPhoneNumber,
            createdAt: new Date().toISOString(),
            userId: user.uid
          });
        } else {
          // If no users left, remove the entire group
          const entriesRef = ref(database, `users/${currentPhoneNumber}/entries/${currentGroupId}`);
          await remove(entriesRef);
          
          // Check if this was the last group for this phone number
          const phoneRef = ref(database, `users/${currentPhoneNumber}`);
          const snapshot = await get(phoneRef);
          if (snapshot.exists()) {
            const phoneData = snapshot.val();
            if (!phoneData.entries || Object.keys(phoneData.entries).length === 0) {
              // Remove the entire phone number entry if no groups left
              await remove(phoneRef);
            }
          }
        }

        console.log('Updated existing group after deletion:', currentGroupId);
        
        // Immediately refresh the display
        if (updatedResults.length > 0) {
          await refreshFamilyGroup();
        } else {
          // If no members left, go back to search
          handleBackToSearch();
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };

  // If showing results, display them in responsive grid with CRUD functionality
  if (selectedResults.length > 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 pt-20">
          <div className="flex justify-center">
            <Button 
              onClick={() => openUserModal('add')}
              className="bg-amber-600 hover:bg-amber-700 text-white flex items-center"
            >
              <Plus size={16} />
              Add Family Member
            </Button>
          </div>
        

        {/* Display Results with CRUD buttons */}
        {selectedResults.length === 1 ? (
          // Single person - full width card
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-xl border border-gray-200 bg-white rounded-xl relative">
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openUserModal('edit', selectedResults[0], 0)}
                  className="flex items-center gap-2"
                >
                  <Edit size={14} />
                  Edit
                </Button>
              </div>
              <div className="p-6">
                <LoshoGrid 
                  gridData={{
                    frequencies: selectedResults[0].gridData,
                    grid: [],
                    originalDate: selectedResults[0].dateOfBirth,
                    digits: []
                  }} 
                  userData={{
                    fullName: selectedResults[0].fullName,
                    dateOfBirth: selectedResults[0].dateOfBirth,
                    timeOfBirth: selectedResults[0].timeOfBirth,
                    placeOfBirth: selectedResults[0].placeOfBirth,
                    numerologyData: selectedResults[0].numerologyData
                  }}
                />
              </div>
            </Card>
          </div>
        ) : (
          // Multiple people - grid layout
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {selectedResults.map((result, index) => (
              <div key={`search-result-${index}-${result.fullName}`}>
                <Card className="shadow-xl border border-gray-200 bg-white rounded-xl h-full relative">
                  {/* CRUD Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openUserModal('edit', result, index)}
                      className="flex items-center gap-1"
                    >
                      <Edit size={12} />
                    </Button>
                    {result.relation !== 'SELF' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setManagementModal({
                            isOpen: true,
                            mode: 'edit',
                            userData: result,
                            userIndex: index
                          });
                          handleUserDelete();
                        }}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={12} />
                      </Button>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <Badge 
                        variant="outline" 
                        className={`
                          px-3 py-1 text-sm font-medium rounded-full
                          ${result.relation === 'SELF' 
                            ? 'bg-amber-100 text-amber-700 border-amber-300' 
                            : 'bg-blue-100 text-blue-700 border-blue-300'
                          }
                        `}
                      >
                        {result.relation === 'SELF' ? 'Main' : result.relation}
                      </Badge>
                    </div>
                    
                    <LoshoGrid 
                      gridData={{
                        frequencies: result.gridData,
                        grid: [],
                        originalDate: result.dateOfBirth,
                        digits: []
                      }} 
                      userData={{
                        fullName: result.fullName,
                        dateOfBirth: result.dateOfBirth,
                        timeOfBirth: result.timeOfBirth,
                        placeOfBirth: result.placeOfBirth,
                        numerologyData: result.numerologyData
                      }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* User Management Modal */}
        <UserManagementModal
          isOpen={managementModal.isOpen}
          onClose={closeUserModal}
          onSave={handleUserSave}
          onDelete={managementModal.mode === 'edit' && managementModal.userData?.relation !== 'SELF' ? handleUserDelete : undefined}
          userData={managementModal.userData}
          mode={managementModal.mode}
          isMainUser={managementModal.userData?.relation === 'SELF'}
        />
      </div>
    );
  }

  // Group results by groupId for display
  const groupedResults = searchResults.reduce((groups, result) => {
    const groupId = result.groupId || result.id;
    if (!groups[groupId]) {
      groups[groupId] = [];
    }
    groups[groupId].push(result);
    return groups;
  }, {});

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl font-light text-gray-700">
            Search Your Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nameSearch" className="flex items-center gap-2 text-gray-700">
                <User size={16} />
                Full Name <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="nameSearch"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter any family member's name"
                className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
              />
              <p className="text-xs text-gray-500">
                Search by any family member's name to see the entire family group
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mobileSearch" className="flex items-center gap-2 text-gray-700">
                <Phone size={16} />
                Mobile Number <span className="text-gray-400">(Optional)</span>
              </Label>
              <Input
                id="mobileSearch"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 XXXXX XXXXX (optional filter)"
                className="border-gray-200 focus:border-amber-400 focus:ring-amber-400"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Family Records'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searched && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-light text-gray-700">
              Family Groups Found for "{fullName}"
              {mobileNumber && ` (${mobileNumber})`}
            </h3>
            {searchResultInfo && (
              <p className="text-sm text-amber-600 mt-1 font-medium">
                Showing results for: {searchResultInfo}
              </p>
            )}
          </div>
          
          {Object.keys(groupedResults).length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-gray-500">No family records found under this name.</p>
                {mobileNumber && (
                  <p className="text-gray-400 text-sm mt-2">
                    Try searching with just the name, or check if the mobile number is correct.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedResults).map(([groupId, groupResults]: [string, any[]]) => (
                <Card key={groupId} className="shadow-md">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-800 text-center">
                        Family Reading ({groupResults.length} member{groupResults.length > 1 ? 's' : ''})
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groupResults.slice(0, 2).map((result: any, index) => (
                          <div key={index} className="space-y-2">
                            <div className="font-medium text-gray-800">{result.fullName}</div>
                            <div className="inline-block px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                              {result.relation}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar size={14} />
                              <span>{result.dateOfBirth}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone size={14} />
                              <span>{result.phoneNumber}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {groupResults.length > 2 && (
                        <div className="text-sm text-gray-500 text-center">
                          +{groupResults.length - 2} more member{groupResults.length - 2 > 1 ? 's' : ''}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-center">
                        <Button 
                          onClick={() => handleShowResults(groupId)}
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          Show Complete Family Analysis
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-gray-500 text-center">
                      Created: {new Date(groupResults[0].createdAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
