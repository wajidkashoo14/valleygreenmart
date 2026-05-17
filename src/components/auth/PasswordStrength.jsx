import { useMemo } from 'react'

function getStrength(password) {
  if (!password) return { score: 0, label: '', color: '' }
  let score = 0
  if (password.length >= 8)  score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { score, label: 'Weak',      color: 'bg-red-400'    }
  if (score <= 2) return { score, label: 'Fair',      color: 'bg-amber-400'  }
  if (score <= 3) return { score, label: 'Good',      color: 'bg-yellow-400' }
  if (score <= 4) return { score, label: 'Strong',    color: 'bg-green-400'  }
  return              { score, label: 'Very Strong', color: 'bg-green-600'  }
}

export default function PasswordStrength({ password }) {
  const { score, label, color } = useMemo(() => getStrength(password), [password])
  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < score ? color : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-[11px] font-semibold ${
        score <= 1 ? 'text-red-500' :
        score <= 2 ? 'text-amber-500' :
        score <= 3 ? 'text-yellow-600' :
        'text-green-600'
      }`}>
        {label} password
      </p>
    </div>
  )
}
