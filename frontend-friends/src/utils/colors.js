const colors = ['blue', 'cyan', 'red', 'yellow', 'brown', 'green', 'purple', 'violet']

export function getCategoryColor (categoryId) {
  return 'category-' + colors[categoryId % colors.length]
}
