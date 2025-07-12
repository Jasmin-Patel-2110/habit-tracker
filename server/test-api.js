const testAPI = async () => {
  const baseURL = 'http://localhost:3000/api/habits';

  try {
    console.log('🧪 Testing Habit Tracker API...\n');

    // Test 1: Create a habit
    console.log('1. Creating a new habit...');
    const createResponse = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Exercise daily',
        frequency: 'daily',
      }),
    });

    const newHabit = await createResponse.json();
    console.log('✅ Habit created:', newHabit.title);
    console.log('   ID:', newHabit._id);

    // Test 2: Get all habits
    console.log('\n2. Getting all habits...');
    const getAllResponse = await fetch(baseURL);
    const allHabits = await getAllResponse.json();
    console.log('✅ Found', allHabits.length, 'habits');

    // Test 3: Log the habit for today
    console.log('\n3. Logging habit completion for today...');
    const logResponse = await fetch(`${baseURL}/${newHabit._id}/log`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: true,
      }),
    });

    const loggedHabit = await logResponse.json();
    console.log('✅ Habit logged successfully');
    console.log('   Current streak:', loggedHabit.streakData.currentStreak);
    console.log('   Total completed:', loggedHabit.streakData.totalCompleted);

    // Test 4: Get the specific habit
    console.log('\n4. Getting specific habit...');
    const getOneResponse = await fetch(`${baseURL}/${newHabit._id}`);
    const singleHabit = await getOneResponse.json();
    console.log('✅ Retrieved habit:', singleHabit.title);

    console.log('\n🎉 All API tests passed!');
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
};

testAPI();
