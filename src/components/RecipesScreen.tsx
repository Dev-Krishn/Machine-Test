import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import {ThemeContext} from '../themes/ThemeContext';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const RecipesScreen: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {theme, themeStyles} = useContext(ThemeContext);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();

      if (response.ok) {
        setRecipes(data.recipes);
        setFilteredRecipes(data.recipes);
      } else {
        setError('Failed to load recipes');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Call fetchRecipes when the component mounts
  useEffect(() => {
    fetchRecipes();
  }, []);

  // Filter recipes based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filteredData = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredRecipes(filteredData);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const renderItem = ({item}: {item: Recipe}) => (
    <View
      style={[
        styles.recipeCard,
        {
          backgroundColor: themeStyles[theme].backgroundColor,
          borderColor: themeStyles[theme].borderColor,
        },
      ]}>
      <Image source={{uri: item.image}} style={styles.recipeImage} />
      <Text style={[styles.recipeTitle, {color: themeStyles[theme].textColor}]}>
        {item.name}
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Cuisine: {item.cuisine}
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Difficulty: {item.difficulty}
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Prep Time: {item.prepTimeMinutes} minutes
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Cook Time: {item.cookTimeMinutes} minutes
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Servings: {item.servings}
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Calories per Serving: {item.caloriesPerServing}
      </Text>
      <Text style={[styles.recipeText, {color: themeStyles[theme].textColor}]}>
        Rating: {item.rating} ({item.reviewCount} reviews)
      </Text>

      <Text
        style={[styles.sectionTitle, {color: themeStyles[theme].textColor}]}>
        Ingredients:
      </Text>
      <FlatList
        data={item.ingredients}
        renderItem={({item}) => (
          <Text
            style={[styles.listItem, {color: themeStyles[theme].textColor}]}>
            - {item}
          </Text>
        )}
        keyExtractor={(ingredient, index) => `${index}`}
      />

      <Text
        style={[styles.sectionTitle, {color: themeStyles[theme].textColor}]}>
        Instructions:
      </Text>
      <FlatList
        data={item.instructions}
        renderItem={({item}) => (
          <Text
            style={[styles.listItem, {color: themeStyles[theme].textColor}]}>
            - {item}
          </Text>
        )}
        keyExtractor={(instruction, index) => `${index}`}
      />
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: themeStyles[theme].backgroundColor},
      ]}>
      {/* Search Bar */}
      <TextInput
        style={[
          styles.searchBar,
          {
            backgroundColor: themeStyles[theme].backgroundColor,
            color: themeStyles[theme].textColor,
          },
        ]}
        placeholder="Search Recipes..."
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#555'}
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color={themeStyles[theme].primaryColor}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text
            style={[styles.errorText, {color: themeStyles[theme].textColor}]}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    fontSize: 16,
  },
  listContainer: {
    width: '100%',
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  recipeText: {
    fontSize: 14,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  listItem: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});
