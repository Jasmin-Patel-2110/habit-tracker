const testIntegration = async () => {
  console.log('🧪 Testing Full Stack Integration...\n');

  try {
    // Test 1: Backend health
    console.log('1. Testing backend health...');
    const healthResponse = await fetch('http://localhost:3000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Backend:', healthData.message);

    // Test 2: Create a test habit
    console.log('\n2. Creating a test habit...');
    const createResponse = await fetch('http://localhost:3000/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Habit for Frontend',
        frequency: 'daily',
      }),
    });

    const newHabit = await createResponse.json();
    console.log('✅ Habit created:', newHabit.title);

    // Test 3: Log the habit
    console.log('\n3. Logging habit completion...');
    const logResponse = await fetch(
      `http://localhost:3000/api/habits/${newHabit._id}/log`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      }
    );

    const loggedHabit = await logResponse.json();
    console.log(
      '✅ Habit logged, streak:',
      loggedHabit.streakData.currentStreak
    );

    // Test 4: Frontend accessibility
    console.log('\n4. Testing frontend...');
    const frontendResponse = await fetch('http://localhost:5173');
    console.log(
      '✅ Frontend accessible:',
      frontendResponse.status === 200 ? 'OK' : 'Error'
    );

    console.log('\n🎉 Full stack integration test passed!');
    console.log('\n📱 You can now open http://localhost:5173 in your browser');
    console.log('🔗 Backend API: http://localhost:3000/api/habits');
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
  }
};

testIntegration();
