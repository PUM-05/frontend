const colors = ['blue', 'red', 'cyan', 'yellow', 'brown', 'dark-blue', 'purple', 'violet', 'gray', 'orange', 'darker-green']

export function getCategoryColor(categoryId){
    return colors[categoryId % colors.length]
}